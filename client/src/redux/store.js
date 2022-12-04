import { configureStore } from '@reduxjs/toolkit';
import reducer from '../reducers/reducer';

const store = configureStore({
    reducer: {state: reducer}, 
});

export default store;