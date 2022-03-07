import React, { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import Exercise from '../components/Exercise';

const NewWorkout = () =>
{
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
                    onAddNew: (newItem) => 
                    {
                        console.log('TODO: Onadd handling', newItem);
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
                    <Exercise 
                    key={i}
                    fields={exercise.fields}
                    onChange={(newState) => 
                    {
                        onChangeWorkout(newState, i);
                    }}/>
                    <Divider key={`workout-divider-${i}`}/>
                    </View>)}
            </View>
    </ScrollView>);
};

export default NewWorkout;