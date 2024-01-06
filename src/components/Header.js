import {Animated, StyleSheet, View, Text} from "react-native"
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import {MAX_SWIPE_SCROLL, primary} from "../constantes"

export default ({swipe, handlers}) => {
    
    const translateHeaderScroll = {
        transform: [
            {
                translateY: swipe.y.interpolate({
                    inputRange: [0, MAX_SWIPE_SCROLL],
                    outputRange: [0, MAX_SWIPE_SCROLL],
                    extrapolate: 'clamp'
                })
            }
        ]
    }

    return(
        <Animated.View 
            style={[styles.header, translateHeaderScroll]}
            {...handlers}
        >
            <View style={styles.option}>
                <Material name='chevron-left' size={30} color={'#fff'}/>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 17}}>Menú</Text>
            </View>
            <View style={styles.option}>
                <Material name='cart' size={22} color={'#fff'}/>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 55,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primary,
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        zIndex: 10
    },
    option: {
        height: '100%',
        width: 55,
        justifyContent: 'center',
        alignItems: 'center'
    }
})