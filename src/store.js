import {applyMiddleware, configureStore} from '@reduxjs/toolkit';
import {appSlice, orientationSlice, refreshSlice} from './slices';
import thunk from 'redux-thunk'

export const store = configureStore({
    reducer: {
        navApp: appSlice,
        navRefresh: refreshSlice,
        navOrientation: orientationSlice,
    }
}, applyMiddleware(thunk))