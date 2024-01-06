import {createSlice} from '@reduxjs/toolkit'
import Orientation from 'react-native-orientation'

const initialState = {
    orientation: Orientation.getInitialOrientation()
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setOrientation: (state, action) => {state.orientation = action.payload},
    }
})

export const {setOrientation} = navSlice.actions

export const selectOrientation = (state) => state.navOrientation.orientation;

export default navSlice.reducer