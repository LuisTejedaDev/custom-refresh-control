import {useRef} from 'react';
import {Animated, PanResponder} from 'react-native';
import {setRefreshValue} from '../slices/refreshSlice';
import {useDispatch} from 'react-redux';

export default ({MAX_SWIPE_SCROLL}) => {
    
    const dispatch = useDispatch()
    const swipe = useRef(new Animated.ValueXY(0)).current;

    const handleRestart = () => {
        Animated.spring(swipe, {
            toValue: ({x: 0, y: -1}),
            friction: 8,
            useNativeDriver: false
        }).start()
    }

    const handleRefresh = (refresh = false) => {
        if(refresh){
            dispatch(setRefreshValue())
            handleRestart()
        } else {
            handleRestart()
        }
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
            null,
            {
                dx: swipe.x,
                dy: swipe.y 
            }
        ], {useNativeDriver: false}),
        onPanResponderRelease: (e, {dx, dy, vx, vy}) => {
            if(dy > (MAX_SWIPE_SCROLL * 2)){
                Animated.decay(swipe, {
                    velocity: ({x: vx, y: vy}),
                    deceleration: 0.978,
                    useNativeDriver: false
                }).start(({finished}) => {
                    if(finished) handleRefresh(true)
                })
            } else {
                handleRefresh(false)
            }
        }
    });

    return {
        swipe,
        handlers: panResponder.panHandlers
    }
}