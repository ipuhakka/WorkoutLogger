import React, { useState, useEffect, } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import SliderInput from './SliderInput';
import NumberInput from './NumberInput';
import { ExerciseTypes } from '../constansts';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

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
    trashIconDiv: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10
    }
});

const CardioExercise = ({
    sets,
    distance,
    time,
    exercise,
    onAddNewExercise,
    exerciseOptions,
    onChange,
    onDelete}) =>
{
    return (<View style={styles.exerciseDiv}>
        <View>
            <Pressable 
                onPress={onDelete}
                style={styles.trashIconDiv}>
                <EvilIcon
                    name='trash'
                    size={45}
                    color='red' />
            </Pressable>
        </View>
        <Dropdown
                title='Harjoitus'
                options={exerciseOptions}
                allowAddNew={true}
                onAddNew={(item) => onAddNewExercise(item)}
                style={styles.field}
                value={exercise}
                onChange={(newExerciseKey) =>
                {
                    onChange({
                        sets: sets,
                        distance: distance,
                        time: time,
                        exercise: newExerciseKey,
                        exerciseType: ExerciseTypes.cardioExercise
                    });
                }} />
        <NumberInput 
            label='Aika (min.ss)'
            value={time}
            style={styles.field}
            onChange={(newTime) =>
            {
                onChange({
                    sets: sets,
                    distance: distance,
                    time: newTime,
                    exercise: exercise,
                    exerciseType: ExerciseTypes.cardioExercise
                });
            }}
        />
        <NumberInput
            label='Et??isyys (m)'
            style={styles.field}
            value={distance}
            onChange={(newDistance) =>
            {
                onChange({
                    sets: sets,
                    distance: newDistance,
                    time: time,
                    exercise: exercise,
                    exerciseType: ExerciseTypes.cardioExercise
                });
            }}
        />
        <SliderInput
            title='Sarjat'
            sliderMinValue={1}
            sliderMaxValue={5}
            value={sets}
            style={styles.sliderField}
            onChange={(newValue) =>
            {
                onChange({
                    sets: newValue,
                    distance: distance,
                    time: time,
                    exercise: exercise,
                    exerciseType: ExerciseTypes.cardioExercise
                });
            }} />
    </View>);
};

CardioExercise.propTypes = {
    sets: PropTypes.number,
    distance: PropTypes.number,
    time: PropTypes.number,
    exercise: PropTypes.string,
    onAddNewExercise: PropTypes.func.isRequired,
    exerciseOptions: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.any.isRequired,
        title: PropTypes.string.isRequired
    })),
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default CardioExercise;