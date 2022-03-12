import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Dropdown from './Dropdown';
import SliderInput from './SliderInput';
import { TextInput, Switch, Subheading } from 'react-native-paper';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    exerciseDiv: {
        borderColor: 'black',
        borderTopWidth: 2,
        marginTop: 50
    },
    field: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 2
    },
    sliderField: {
        marginLeft: 10,
        marginRight: 40,
        marginTop: 2
    },
    switchView: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

/** Component for weight exercise with equal sets */
const NormalExercise = ({ exerciseOptions, onAddNewExercise, onChange }) =>
{
    /** Exercise state. Exercise name, sets, reps, weight */
    const [exerciseState, setExerciseState] = useState({
        exercise: null,
        sets: 3,
        reps: 10,
        weight: null,
        type: 'normal'
    });

    const changeExerciseState = (newState) =>
    {
        setExerciseState(newState),
        onChange(newState);
    }

    return <>
        <Dropdown
        title='Harjoitus'
        options={exerciseOptions}
        allowAddNew={true}
        onAddNew={(item) => onAddNewExercise(item)}
        style={styles.field}
        value={exerciseState.exercise}
        onChange={(newExerciseKey) =>
        {
            const newExerciseState = {...exerciseState};
            newExerciseState.exercise = newExerciseKey;
            changeExerciseState(newExerciseState);
        }}
        />
        <SliderInput
            title='Sarjat'
            sliderMinValue={1}
            sliderMaxValue={5}
            value={exerciseState.sets}
            style={styles.sliderField}
            onChange={(newValue) =>
            {
                const newExerciseState = {...exerciseState};
                
                newExerciseState.sets = newValue;
                changeExerciseState(newExerciseState);
            }} />
        <SliderInput
            title='Toistot'
            sliderMinValue={1}
            sliderMaxValue={12}
            style={styles.sliderField}
            value={exerciseState.reps}
            onChange={(newValue) =>
            {
                const newExerciseState = {...exerciseState};
                newExerciseState.reps = newValue;
                changeExerciseState(newExerciseState);
            }} />
        <View style={styles.field}>
            <TextInput 
                label='Paino'
                value={exerciseState.weight}
                onChangeText={(newWeight) =>
                {
                    /** TODO: Numeerisena */
                    const newExerciseState = {...exerciseState};
                    newExerciseState.weight = newWeight;
                    changeExerciseState(newExerciseState);
                }}
            />
        </View>
    </>;
}

const ProgressiveExercise = ({ exerciseOptions, onAddNewExercise, onChange }) =>
{
    return <Subheading>Progressive</Subheading>;
}

const WeightExercise = ({ exerciseOptions, onAddNewExercise, onChange }) =>
{
    const [individualSetModeOn, setIndividualSetModeOn] = useState(false);

    return <View style={styles.exerciseDiv}>
        {<View style={styles.switchView}>
            <Subheading>Syötä sarjat yksittäin</Subheading>
            <Switch 
                value={individualSetModeOn}
                onValueChange={() => setIndividualSetModeOn(!individualSetModeOn)}
                color='blue'/>
        </View>}
        {individualSetModeOn
            ? <ProgressiveExercise />
            : <NormalExercise
            exerciseOptions={exerciseOptions}
            onAddNewExercise={onAddNewExercise}
            onChange={(newState) =>
            {
                onChange(newState);
            }} />}
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