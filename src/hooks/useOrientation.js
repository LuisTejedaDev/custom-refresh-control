import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setOrientation} from "../slices/orientationSlice";
import Orientation from 'react-native-orientation'

export default () => {
    const dispatch = useDispatch()

    const handleOrientationDidChange = (data) => {
        dispatch(setOrientation(data))
    }

    useEffect(() => {
        Orientation.addOrientationListener(handleOrientationDidChange);

        return () => Orientation.removeOrientationListener(handleOrientationDidChange)
    }, [])
}