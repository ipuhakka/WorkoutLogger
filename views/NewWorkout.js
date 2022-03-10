import React, { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import weightExercise from '../components/WeightExercise';
import { useDispatch } from 'react-redux';
import { createExercise } from '../middlewares/exerciseMiddleware';
import WeightExercise from '../components/WeightExercise';

const exerciseTypes = Object.freeze({
    weightExercise: 'weightExercise',
    staminaExercise: 'staminaExercise'
});

const NewWorkout = () =>
{
    const dispatch = useDispatch();
    const [exercises, setExercises] = useState([]);
    const [workoutState, setWorkoutState] = useState([]);

    const onChangeWorkout = (exercise, index) =>
    {
        const newState = [...workoutState];
        newState[index] = exercise;
        setWorkoutState(newState);
    }

    const addWeightExercise = () =>
    {
        const newExercises = [...exercises];
        newExercises.push({
            fields: [
                {
                    title: 'Harjoite',
                    fieldKey: 'Exercise',
                    fieldType: 'dropdown',
                    options: [
                        { key: 'mave', title: 'Maastaveto'},
                        { key: 'Kyykky', title: 'Kyykkä' }
                    ],
                    allowAddNew: true,
                    onAddNew: async (newItem) => 
                    {
                        // TODO: Händlää
                        const result = await dispatch(createExercise(newItem, 'weightExercise'));
                    }
                },
                {
                    title: 'Sarjat',
                    fieldKey: 'Sets',
                    fieldType: 'slider',
                    sliderMinValue: 1,
                    sliderMaxValue: 5,
                    defaultValue: 3
                },
                {
                    title: 'Toistot',
                    fieldKey: 'Reps',
                    fieldType: 'slider',
                    sliderMinValue: 1,
                    sliderMaxValue: 12,
                    defaultValue: 8
                },
                {
                    title: 'Paino',
                    fieldKey: 'Weight',
                    fieldType: 'textInput',
                    defaultValue: '100'
                }
            ]
        });

        setExercises(newExercises);
    }

    return (<ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Button 
            mode='outlined'
            color='blue'
            onPress={addWeightExercise}>Lisää uusi voimaharjoite</Button>
            <View>
                {exercises.map((exercise, i) => <View key={`exercise-view-${i}`}>
                    <WeightExercise 
                        onChange={(newState) => onChangeWorkout(newState, i)}
                        exerciseOptions={
                            [
                                { key: 'mave', title: 'Maastaveto'},
                                { key: 'Kyykky', title: 'Kyykkä' }
                            ]
                        }/>
                    <Divider key={`workout-divider-${i}`}/>
                    </View>)}
            </View>
    </ScrollView>);
};

export default NewWorkout;