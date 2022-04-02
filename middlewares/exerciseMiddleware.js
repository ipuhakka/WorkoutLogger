import { setExercises } from '../reducers/exerciseReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import { StorageKeys } from '../constansts';

/** Returns a list of all exercises */
function getExercises()
{
    return async (dispatch) => 
    {
        const exercisesJson = await AsyncStorage.getItem(StorageKeys.exercises);

        const exercises = exercisesJson
            ? JSON.parse(exercisesJson)
            : [];

        return dispatch(setExercises({ exercises: exercises }));
    };
}

/** Adds a new category
 * @param {string} name
 * @param {string} type 
 */
function createExercise(name, type)
{
    return async (dispatch) =>
    {
        const exerciseJson = await AsyncStorage.getItem(StorageKeys.exercises);
        const newExercises = exerciseJson 
            ? JSON.parse(exerciseJson)
            : [];
            newExercises.push({name: name, type: type});
        await AsyncStorage.setItem(StorageKeys.exercises, JSON.stringify(newExercises));

        return dispatch(setExercises({ exercises: newExercises }));
    }
}

export {
    getExercises,
    createExercise
}