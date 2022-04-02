import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import exerciseReducer from '../reducers/exerciseReducer';

const store = configureStore({
    reducer: {
        exercise: exerciseReducer
    },
    middleware: [thunk]
});

export default store;