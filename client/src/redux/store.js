import { combineReducers, configureStore } from '@reduxjs/toolkit';
import reducer from '../reducers/reducer';

export const store = configureStore({
    reducer: {
        reducer: reducer,
    },
});

export default store;