import { createSlice } from '@reduxjs/toolkit';

const workoutSlice = createSlice({
    name: 'workout',
    initialState: {
        workoutHistory: []
    },
    reducers: {
        setWorkoutHistory: {
            reducer: (state, action) =>
            {
                state.workoutHistory = action.payload.workoutHistory;
            }
        }
    }
});

export const { setWorkoutHistory } = workoutSlice.actions;
export default workoutSlice.reducer;
