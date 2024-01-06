import React, {useEffect, useRef, useState} from 'react'
import {View, Text, StyleSheet, Animated, Vibration} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { selectRefreshValue } from '../slices/refreshSlice'
import { useSelector } from 'react-redux'

export const Success = '#28A745'
export const Info = '#2B99D2'
export const Warning = '#DC3545'

export default ({type, title}) => {

    const refreshValue = useSelector(selectRefreshValue)

    const [dimensions, setDimension] = useState({})
    const {width} = dimensions

    const animatedValues = {
        opacity: useRef(new Animated.Value(0)).current,
        progress: useRef(new Animated.Value(0)).current
    }

    const {opacity, progress} = animatedValues

    useEffect(() => {
        handleAnimated()
    }, [refreshValue])

    const handleAnimated = () => {
        Vibration.vibrate()
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 800,
                useNativeDriver: false
            }),
            Animated.timing(progress, {
                toValue: 1,
                duration: 4500,
                useNativeDriver: false
            })
        ]).start(({finished}) => {
            if(finished){
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 800,
                    useNativeDriver: false
                }).start(({finished}) => {
                    if(finished){
                        progress.setValue(0)
                    }
                })
            } else {
                Animated.parallel([
                    Animated.spring(progress, {
                        toValue: 1,
                        useNativeDriver: false
                    }),
                    Animated.spring(opacity, {
                        toValue: 1,
                        useNativeDriver: false
                    })
                ]).start()
            }
        })
    }

    const animatedContainer = {
        opacity: opacity
    }

    const progressStyles = {
        width: progress.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%']
        })
    }

    const saveDimensions = ({nativeEvent: {layout: {height, width}}}) => {
        setDimension({
            height,
            width
        })
    }

    return(
        <Animated.View style={[styles.container, animatedContainer]}>
            <View style={[styles.box, {backgroundColor: type === 1 ? Success : type === 2 ? Info : Warning}]}>
                <View style={styles.icon}>
                    {
                        type === 1 || type === 2
                        ?
                            <FontAwesome name={type === 1 ? 'check' : 'info'} size={10} color={type === 1 ? Success : Info}/>
                        :
                            <MaterialIcon name={'exclamation-thick'} size={10} color={Warning}/>
                    }
                </View>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={{width: 18, height: 18}}/>
            </View>
            <View style={styles.progressContainer} onLayout={saveDimensions}>
                <Animated.View style={[styles.progress, progressStyles]}/>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 'auto',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden',
        zIndex: 100
    },
    box: {
        height: 'auto',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: 'row'
    },
    icon: {
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        paddingLeft: 1,
        backgroundColor: '#fff',
        borderRadius: 25
    },
    titleBox: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    title: {
        fontWeight: '700',
        fontSize: 14,
        color: '#fff'
    },
    progressContainer: {
        height: 'auto',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#fff'
    },
    progress: {
        height: 2.5,
        backgroundColor: '#ffc107'
    }
})