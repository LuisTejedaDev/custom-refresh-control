import {Animated, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native'
import {MAX_SWIPE_SCROLL, secondary} from '../constantes';
import {burgir} from '../data';
import Burgir from './Burgir';
import FloatingAlert from './FloatingAlert';

export default ({Header, swipe, handlers, children}) => {

    const translateContentScroll = {
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
        <>
            <SafeAreaView style={{flex: 0, backgroundColor: secondary}} />
                <View style={styles.container}>
                    <View style={styles.refreshContainer}>
                        {burgir.map(x => <Burgir key={x.id} swipe={swipe} {...x}/>)}
                    </View>
                    <Header swipe={swipe} handlers={handlers}/>
                    <Animated.View style={[styles.translateContainer, translateContentScroll]}>
                        {children}
                    </Animated.View>
                    {/* 
                        Para el componente de FloatingAlert les recomiendo siempre hacer una variable generica de Redux
                        que manden a llamar cada que haya una alerta en su aplicación, de esta forma hacer su alerta
                        siempre reutilizable, pueden borrarla para sus refreshControl, no es necesaria.
                    */}
                    <FloatingAlert type={2} title={'Recarga de Información'}/>
                </View>
            <SafeAreaView style={{flex: 0, backgroundColor: secondary}} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff'
    },
    refreshContainer: {
        height: MAX_SWIPE_SCROLL,
        width: '100%',
        backgroundColor: 'rgba(90,184,33,0.2)',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0
    },
    translateContainer: {
        flex: 1,
        backgroundColor: '#fff'
    },
    scroll: {
        height: 'auto',
        alignSelf: 'stretch'
    }
})