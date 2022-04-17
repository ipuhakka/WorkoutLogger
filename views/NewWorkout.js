import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { createExercise, getExercises } from '../middlewares/exerciseMiddleware';
import Accordion from '../components/Accordion';
import WeightExercise from '../components/WeightExercise';
import CardioExercise from '../components/CardioExercise';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys, ExerciseTypes, WeightExerciseType } from '../constansts';

const styles = StyleSheet.create({
    accordionContainer: {
        marginTop: 4
    },
    stateControlContainer: {
        marginBottom: 20
    },
    button: {
        flex: 1
    }
});

/**
 * Ends workout. Clears current workout and adds it to workouts array
 * @param {*} workoutState 
 */
const endWorkout = async(workoutState) =>
{
    const workoutsJson = await AsyncStorage.getItem(StorageKeys.workouts);

    let workouts = [];
    if (workoutsJson)
    {
        workouts = JSON.parse(workoutsJson);
    }

    workouts.push({
        exercises: workoutState,
        date: new Date().toLocaleDateString()
    });

    await AsyncStorage.setItem(StorageKeys.workouts, JSON.stringify(workouts));
    await AsyncStorage.removeItem(StorageKeys.currentWorkout);
}

const NewWorkout = () =>
{
    const dispatch = useDispatch();
    const savedExercises = useSelector((state) => state.exercise.exercises);

    const [workoutState, setWorkoutState] = useState([]);
    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState(null);

    useEffect(() => 
    {
        const getSavedWorkoutState = async () =>
        {
            const currentWorkoutJson = await AsyncStorage.getItem(StorageKeys.currentWorkout);

            if (currentWorkoutJson)
            {
                setWorkoutState(JSON.parse(currentWorkoutJson));
            }
        }

        getSavedWorkoutState();
        dispatch(getExercises());
    }, []);

    const onChangeWorkout = (exercise, index) =>
    {
        const newState = [...workoutState];
        const oldExerciseState = newState[index];

        if (oldExerciseState.type !== exercise.type)
        {
            if (exercise.type === WeightExerciseType.custom)
            {
                delete exercise.reps;
                delete exercise.weight;
                exercise.sets = [];
            }
            else
            {
                exercise.sets = 3;
                exercise.reps = 10;
                exercise.weight = null;
            }
        }

        newState[index] = exercise;
        setWorkoutState(newState);

        AsyncStorage.setItem(StorageKeys.currentWorkout, JSON.stringify(newState));
    };

    const addWeightExercise = () =>
    {
        const newExercises = [...workoutState];
        newExercises.push({
            exercise: null,
            sets: 3,
            reps: 10,
            weight: null,
            type: WeightExerciseType.normal,
            exerciseType: ExerciseTypes.weightExercise
        });

        setWorkoutState(newExercises);
    }

    const addCardioExercise = () =>
    {
        const newExercises = [...workoutState];
        newExercises.push({
            time: null,
            sets: 1,
            distance: null,
            exerciseType: ExerciseTypes.cardioExercise
        });

        setWorkoutState(newExercises);
    }

    const confirmEndWorkout = () =>
    {
        Alert.alert(
            'Päätä treeni',
            'Päätetäänkö treeni?',
            [
                { text: 'Peruuta' },
                { 
                    text: 'Ok',
                    onPress: () =>
                    {
                        endWorkout(workoutState);
                        setWorkoutState([]);

                        setSnackBarMessage('Treeni päätetty')
                        setSnackBarVisible(true);
                    }}
            ]
        )
    }

    return (<ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Snackbar
            visible={snackBarVisible}
            onDismiss={() => setSnackBarVisible(false)}
            duration={1000}>
                {snackBarMessage}
        </Snackbar>
        <View style={styles.stateControlContainer}>
            <Button
                style={styles.button}
                color='black'
                mode='outlined'
                onPress={confirmEndWorkout}>Päätä treeni</Button>
        </View>
        <Button
            color='blue'
            onPress={addWeightExercise}>Uusi voimaharjoite</Button>
        <Button
            color='blue'
            onPress={addCardioExercise}>Uusi kestävyysharjoite</Button>
        <View>
            {workoutState
                .map((exercise, i) => <View style={styles.accordionContainer} key={`exercise-view-${i}`}>
                <Accordion title={_.get(exercise, 'exercise', '')}>
                    {exercise.exerciseType === ExerciseTypes.weightExercise
                        ? <WeightExercise
                            onChange={(newState) => onChangeWorkout(newState, i)}
                            exerciseState={exercise}
                            onAddNewExercise={(newExercise) =>
                                {
                                    dispatch(createExercise(newExercise, ExerciseTypes.weightExercise));
                                    setSnackBarMessage(`Luotiin uusi harjoitus: ${newExercise}`);
                                    setSnackBarVisible(true);
                                }}
                            exerciseOptions={savedExercises
                                .filter(savedExercise => savedExercise.type === ExerciseTypes.weightExercise)
                                .map(savedExercise => 
                                {
                                    return { key: savedExercise.name, title: savedExercise.name }
                                })
                            }/>
                        : <CardioExercise
                            sets={exercise.sets}
                            distance={exercise.distance}
                            time={exercise.time}
                            exercise={exercise.exercise}
                            exerciseOptions={savedExercises
                                .filter(savedExercise => savedExercise.type === ExerciseTypes.cardioExercise)
                                .map(savedExercise => 
                                {
                                    return { key: savedExercise.name, title: savedExercise.name }
                                })}
                            onAddNewExercise={(newExercise) =>
                                {
                                    dispatch(createExercise(newExercise, ExerciseTypes.cardioExercise));
                                    setSnackBarMessage(`Luotiin uusi harjoitus: ${newExercise}`);
                                    setSnackBarVisible(true);
                                }}
                            onChange={(newState) => onChangeWorkout(newState, i)}/>}
                </Accordion>
            </View>)}
        </View>
    </ScrollView>);
};

export default NewWorkout;