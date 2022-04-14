import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { createExercise, getExercises } from '../middlewares/exerciseMiddleware';
import Accordion from '../components/Accordion';
import WeightExercise from '../components/WeightExercise';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys, ExerciseTypes, WeightExerciseType } from '../constansts';

const styles = StyleSheet.create({
    accordionContainer: {
        marginTop: 4
    },
    stateControlContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20
    },
    button: {
        flex: 1
    }
});

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
            type: WeightExerciseType.normal
        });

        setWorkoutState(newExercises);
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
                onPress={() => console.log('TODO: Päätä treeni')}>Päätä treeni</Button>
        </View>
        <Button 
            mode='outlined'
            color='blue'
            onPress={addWeightExercise}>Uusi voimaharjoite</Button>
            <View>
                {workoutState.map((exercise, i) => <View style={styles.accordionContainer} key={`exercise-view-${i}`}>
                    <Accordion title={_.get(exercise, 'exercise', '')}>
                        <WeightExercise
                            onChange={(newState) => onChangeWorkout(newState, i)}
                            exerciseState={exercise}
                            onAddNewExercise={(newExercise) =>
                                {
                                    dispatch(createExercise(newExercise, 'weight'));
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
                    </Accordion>
            </View>)}
            </View>
    </ScrollView>);
};

export default NewWorkout;