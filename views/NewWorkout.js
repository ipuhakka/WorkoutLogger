import React, { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { createExercise } from '../middlewares/exerciseMiddleware';
import WeightExercise from '../components/WeightExercise';
import { styles } from 'react-native-element-dropdown/src/SelectCountry/styles';

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
        newExercises.push({});

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
                        onAddNewExercise={(newExercise) => console.log('TODO: lisää uusi harjoitus', newExercise)}
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