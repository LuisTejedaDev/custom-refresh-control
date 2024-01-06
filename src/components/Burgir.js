import {Animated, Image} from "react-native"
import {burgir} from "../data"

export default ({swipe, id, url}) => {
    
    const translate = {
        top: swipe.y.interpolate({
            inputRange: [0, ((burgir.length / id) * 300)],
            outputRange: [0, id * 12],
            extrapolate: 'clamp'
        })
    }

    return(
        <Animated.View style={[{height: 40, width: 40, justifyContent: 'center', alignItems: 'center', position: 'absolute'}, translate]}>
            <Image
                style={{height: 35, width: 35}}
                resizeMode='stretch'
                source={{uri: url}}
            />
        </Animated.View>
    )
}