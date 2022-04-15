import React, { useState, useEffect, } from 'react';
import { View, StyleSheet } from 'react-native';
import Dropdown from './Dropdown';
import SliderInput from './SliderInput';
import TabMenu from './TabMenu';
import { Switch, Subheading, Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import { WeightExerciseType, ExerciseTypes } from '../constansts';
import NumberInput from '../components/NumberInput';

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
const NormalExercise = ({ exerciseOptions, onAddNewExercise, onChange, exerciseState }) =>
{
    const changeExerciseState = (newState) =>
    {
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
            <NumberInput 
                label='Paino'
                value={Number(exerciseState.weight)}
                onChange={(newWeight) =>
                {
                    const newExerciseState = {...exerciseState};
                    newExerciseState.weight = newWeight;
                    changeExerciseState(newExerciseState);
                }}
                keyboardType='numeric'
            />
        </View>
    </>;
}

/** Component for exercise with differing sets */
const CustomExercise = ({ exerciseOptions, onAddNewExercise, onChange, exerciseState }) =>
{
    const [sets, setSets] = useState([]);
    const [exercise, setExercise] = useState(null);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() =>
    {
        setExercise(exerciseState.exercise);
        setSets(exerciseState.sets);
        setActiveTab(exerciseState.sets.length - 1);
    }, []);

    const changeSet = (index, key, value) =>
    {
        const newSets = [...sets];
        newSets[index][key] = value;
        setSets(newSets);
        onChange({
            sets: newSets,
            type: WeightExerciseType.custom,
            setCount: sets.length,
            exercise: exercise
        });
    };

    const changeExercise = (newExercise) =>
    {
        setExercise(newExercise);

        onChange({
            sets: sets,
            setCount: sets.length,
            type: WeightExerciseType.custom,
            exercise: newExercise
        })
    }

    const panes = sets.map((tab, i) => {
        return {
            title: `Sarja ${i+1}`,
            content: <>
                <SliderInput
                    title='Toistot'
                    sliderMinValue={1}
                    sliderMaxValue={12}
                    style={styles.sliderField}
                    value={sets[i].reps}
                    onChange={(newValue) =>
                    {
                        changeSet(i, 'reps', newValue);
                    }} />
                <View style={styles.field}>
                    <NumberInput 
                        label='Paino'
                        value={Number(sets[i].weight)}
                        onChange={(newWeight) =>
                        {
                            changeSet(i, 'weight', newWeight);
                        }}
                    />
                </View>
            </>
        }
    });

    return <View>
        <Dropdown
                title='Harjoitus'
                options={exerciseOptions}
                allowAddNew={true}
                onAddNew={(item) => onAddNewExercise(item)}
                style={styles.field}
                value={exercise}
                onChange={(newExerciseKey) =>
                {
                    changeExercise(newExerciseKey);
                }}
                />
        <Button
            color='blue'
            onPress={() =>
            {
                const newSets = [...sets];
                newSets.push({
                    reps: 10,
                    weight: null
                });
                setSets(newSets);
                setActiveTab(sets.length);
            }}>Lisää uusi sarja</Button>
        <TabMenu panes={panes} activeTab={activeTab} onTabChange={(newActiveTab) =>
        {
            setActiveTab(newActiveTab);
        }}/>
        </View>;
}

const WeightExercise = ({ exerciseOptions, onAddNewExercise, onChange, exerciseState }) =>
{
    const [customModeOn, setCustomModeOn] = useState(false);

    useEffect(() =>
    {
        setCustomModeOn(exerciseState.type === WeightExerciseType.custom);
    }, []);

    const toggleCustomMode = () =>
    {
        // Check if custom mode is not on because state is altered after on change call
        onChange({
            ...exerciseState,
            type: !customModeOn
                ? WeightExerciseType.custom
                : WeightExerciseType.normal
        })

        setCustomModeOn(!customModeOn);
    }

    return <View style={styles.exerciseDiv}>
        {<View style={styles.switchView}>
            <Subheading>Syötä sarjat yksittäin</Subheading>
            <Switch 
                value={customModeOn}
                onValueChange={() => toggleCustomMode()}
                color='blue'/>
        </View>}
        {exerciseState.type === WeightExerciseType.custom
            ? <CustomExercise 
                exerciseOptions={exerciseOptions}
                onAddNewExercise={onAddNewExercise}
                onChange={(newState) =>
                {
                    onChange({
                        ...newState,
                        exerciseType: ExerciseTypes.weightExercise
                    });
                }} 
                exerciseState={exerciseState} />
            : <NormalExercise
                exerciseOptions={exerciseOptions}
                onAddNewExercise={onAddNewExercise}
                onChange={(newState) =>
                {
                    onChange({
                        ...newState,
                        exerciseType: ExerciseTypes.weightExercise
                    });
                }}
                exerciseState={exerciseState} />}
    </View>
}

WeightExercise.propTypes = {
    onChange: PropTypes.func.isRequired,
    exerciseOptions: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.any.isRequired,
        title: PropTypes.string.isRequired
    })),
    onAddNewExercise: PropTypes.func.isRequired,
    exerciseState: PropTypes.object.isRequired
}

export default WeightExercise;