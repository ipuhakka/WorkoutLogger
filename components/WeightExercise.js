import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Dropdown from './Dropdown';
import SliderInput from './SliderInput';
import { TextInput, Title } from 'react-native-paper';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    exerciseDiv: {
        borderColor: 'black',
        borderTopWidth: 2,
        marginTop: 50
    },
    field: {
        margin: 10
    }
});

const WeightExercise = ({ exerciseOptions, onAddNewExercise }) =>
{
    /** Exercise state. Exercise name, Array of sets, each set contains weight and number of reps */
    const [exerciseState, setExerciseState] = useState({
        exercise: null,
        sets: 3,
        reps: 10,
        weight: null,
        type: 'normal'
    });

    return <View style={styles.exerciseDiv}>
        <Dropdown
            title='Harjoitus'
            options={exerciseOptions}
            allowAddNew={true}
            onAddNew={(item) => onAddNewExercise(item)}
            style={styles.field}
            onChange={(newExerciseKey) =>
            {
                const newExerciseState = {...exerciseState};
                newExerciseState.exercise = newExerciseKey;
                setExerciseState(newExerciseState);
            }}
            />
        <SliderInput
            title='Sarjat'
            sliderMinValue={1}
            sliderMaxValue={5}
            value={exerciseState.sets}
            style={styles.field}
            onChange={(newValue) =>
            {
                const newExerciseState = {...exerciseState};
                
                newExerciseState.sets = newValue;
                setExerciseState(newExerciseState);
            }} />
        <SliderInput
            title='Toistot'
            sliderMinValue={1}
            sliderMaxValue={12}
            style={styles.field}
            value={exerciseState.reps}
            onChange={(newValue) =>
            {
                const newExerciseState = {...exerciseState};
                newExerciseState.reps = newValue;
                setExerciseState(newExerciseState);
            }} />
        <View style={styles.field}>
            <Title>Paino</Title>
            <TextInput 
                value={exerciseState.weight}
                onChangeText={(newWeight) =>
                {
                    /** TODO: Numeerisena */
                    const newExerciseState = {...exerciseState};
                    newExerciseState.weight = newWeight;
                    setExerciseState(newExerciseState);
                }}
            />
        </View>
    </View>
}

WeightExercise.propTypes = {
    onChange: PropTypes.func.isRequired,
    exerciseOptions: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.any.isRequired,
        title: PropTypes.string.isRequired
    })),
    onAddNewExercise: PropTypes.func.isRequired
}

export default WeightExercise;