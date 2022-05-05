import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import exerciseReducer from '../reducers/exerciseReducer';
import workoutReducer from '../reducers/workoutReducer';

const store = configureStore({
    reducer: {
        exercise: exerciseReducer,
        workout: workoutReducer
    },
    middleware: [thunk]
});

export default store;