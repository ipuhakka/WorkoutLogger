import { StorageKeys } from '../constansts';
import { setWorkoutHistory } from '../reducers/workoutReducer';
import AsyncStorageUtils from '../utils/AsyncStorageUtils';

/** Get workout history from local storage */
function getWorkoutHistory()
{
    return async (dispatch) =>
    {
        const storedWorkouts = await AsyncStorageUtils.getJsonAsync(StorageKeys.workouts) || [];

        return dispatch(setWorkoutHistory({ workoutHistory: storedWorkouts.reverse() }));
    }
}

export {
    getWorkoutHistory
}