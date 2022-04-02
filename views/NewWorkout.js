import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Divider, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { createExercise, getExercises } from '../middlewares/exerciseMiddleware';
import WeightExercise from '../components/WeightExercise';
import { ExerciseTypes } from '../constansts';

const NewWorkout = () =>
{
    const dispatch = useDispatch();
    const savedExercises = useSelector((state) => state.exercise.exercises);

    useEffect(() => {
        dispatch(getExercises());
    }, []);

    const [exercises, setExercises] = useState([]);
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
        const newExercises = [...exercises];
        newExercises.push({});

        setExercises(newExercises);
    }

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
                {exercises.map((exercise, i) => <View key={`exercise-view-${i}`}>
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
                    <Divider key={`workout-divider-${i}`}/>
            </View>)}
            </View>
    </ScrollView>);
};

export default NewWorkout;