import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    refreshValue: null,
    startAnimation: false
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setRefreshValue: (state, action) => {state.refreshValue = Math.random().toString()},
        setStartAnimation: (state, action) => {state.startAnimation = action.payload},
    }
})

export const {setRefreshValue, setStartAnimation} = navSlice.actions

export const selectRefreshValue = (state) => state.navRefresh.refreshValue;
export const selectStartAnimation = (state) => state.navRefresh.startAnimation;

export default navSlice.reducer