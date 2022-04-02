import { createSlice } from '@reduxjs/toolkit';

const exerciseSlice = createSlice({
    name: 'exercise',
    initialState: {
        exercises: []
    },
    reducers: {
        setExercises: {
            reducer: (state, action) =>
            {
                state.exercises = action.payload.exercises;
            }
        }
    }
});

export const { setExercises } = exerciseSlice.actions;
export default exerciseSlice.reducer;
