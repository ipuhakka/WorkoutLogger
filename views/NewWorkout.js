import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { createExercise, getExercises } from '../middlewares/exerciseMiddleware';
import Accordion from '../components/Accordion';
import WeightExercise from '../components/WeightExercise';
import { ExerciseTypes } from '../constansts';
import _ from 'lodash';

const styles = StyleSheet.create({
    accordionContainer: {
        marginTop: 4
    }
});

const NewWorkout = () =>
{
    const dispatch = useDispatch();
    const savedExercises = useSelector((state) => state.exercise.exercises);

    useEffect(() => {
        dispatch(getExercises());
    }, []);

    const [workoutState, setWorkoutState] = useState([]);
    const [snackBarVisible, setSnackBarVisible] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState(null);

    const onChangeWorkout = (exercise, index) =>
    {
        const newState = [...workoutState];
        newState[index] = exercise;
        setWorkoutState(newState);
    };

    const addWeightExercise = () =>
    {
        const newExercises = [...workoutState];
        newExercises.push({});

        setWorkoutState(newExercises);
    }

    console.log('exercises', workoutState);
    return (<ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Snackbar
            visible={snackBarVisible}
            onDismiss={() => setSnackBarVisible(false)}
            duration={1000}>
                {snackBarMessage}
        </Snackbar>
        <Button 
            mode='outlined'
            color='blue'
            onPress={addWeightExercise}>Lisää uusi voimaharjoite</Button>
            <View>
                {workoutState.map((exercise, i) => <View style={styles.accordionContainer} key={`exercise-view-${i}`}>
                    <Accordion title={_.get(exercise, 'exercise', '')}>
                        <WeightExercise 
                            onChange={(newState) => onChangeWorkout(newState, i)}
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