import {createSlice} from '@reduxjs/toolkit'
import Orientation from 'react-native-orientation'

const initialState = {
    orientation: Orientation.getInitialOrientation(),
    hasConnection: true,
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setOrientation: (state, action) => {state.orientation = action.payload},
        setHasConnection: (state, action) => {state.hasConnection = action.payload},
    }
})

export const {setOrientation, setHasConnection} = navSlice.actions

export const selectOrientation = (state) => state.navApp.orientation;
export const selectHasConnection = (state) => state.navApp.hasConnection;

export default navSlice.reducer