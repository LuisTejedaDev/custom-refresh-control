import {useEffect, useRef} from "react"
import {Animated, StyleSheet, View} from 'react-native'

export default ({style}) => {
    const translate = useRef(new Animated.Value(0)).current
    
    useEffect(() => {
        handleAnimated()
    }, [])

    const handleAnimated = () => {
        Animated.loop(
            Animated.sequence([
                Animated.delay(500),
                Animated.timing(translate, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                })
            ])
        ).start()
    }

    const animatedStyle = {
        transform: [
            {
                translateX: translate.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-50, style?.width],
                    extrapolate: 'clamp'
                })
            }
        ],
        opacity: translate.interpolate({
            inputRange: [0, .3, .5, .8, 1],
            outputRange: [0, .2, .5, .2, 0],
            extrapolate: 'clamp'
        }),
    }

    return( 
        <View style={[{backgroundColor: '#dadada', overflow: 'hidden'}, {...style}]}>
            <Animated.View style={[styles.shadow, animatedStyle]} />
        </View>
    )
}

const styles = StyleSheet.create({
    shadow: {
        height: '100%',
        width: 25,
        position: 'absolute',
        left: 0,
        backgroundColor: 'rgba(255,255,255,0.4)',
    }
})