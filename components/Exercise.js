import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Dropdown from './Dropdown';
import SliderInput from './SliderInput';
import { TextInput, Title } from 'react-native-paper';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Field = ({field, value, onChange, style}) =>
{
    switch (field.fieldType)
    {
        case 'dropdown':
            return <Dropdown 
                title={field.title}
                options={field.options}
                allowAddNew={field.allowAddNew}
                onAddNew={field.onAddNew}
                onChange={(newValue) =>
                {
                    onChange(field.fieldKey, newValue);
                }}
                style={style} />;

        case 'slider':
            return <SliderInput 
                title={field.title} 
                sliderMinValue={field.sliderMinValue} 
                sliderMaxValue={field.sliderMaxValue}
                value={value}
                onChange={(newValue) => 
                {
                    onChange(field.fieldKey, newValue);
                }}
                style={style} />;

        case 'textInput':
            return <View style={style}>
                <Title>{field.title}</Title>
                <TextInput 
                    value={value}
                    onChangeText={(newText) =>
                    {
                        onChange(field.fieldKey, newText);
                    }}
                />
            </View>;

        default: throw new Error('Unhandled fieldtype: ', field.fieldType)
    }
}

const Exercise = ({fields}) =>
{
    const [exerciseState, setExerciseState] = useState({});

    useEffect(() =>
    {
        /** Initialize exercise state with default values */
        const newExerciseState = {};
        fields.forEach(field =>
        {
            newExerciseState[field.fieldKey] = field.defaultValue || null;
        });

        setExerciseState(newExerciseState);
    }, []);

    const onChange = (fieldKey, newFieldValue) =>
    {
        setExerciseState({
            ...exerciseState,
            [fieldKey]: newFieldValue
        });
    }

    return <View style={styles.exerciseDiv}>
        {fields.map((field, i) => <Field
            style={styles.field}
            field={field}
            key={i}
            onChange={onChange}
            value={_.get(exerciseState, field.fieldKey, 'null')}/>)}
        </View>;
};

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

const fieldModel = PropTypes.shape({
    /** Common props */
    fieldType: PropTypes.oneOf(['dropdown', 'textInput', 'slider']),
    valueType: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fieldKey: PropTypes.string.isRequired,

    /** Dropdown*/
    allowAddNew: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.any.isRequired,
        title: PropTypes.string.isRequired
    })),
    /** Function for adding a new item to dropdown */
    onAddNew: PropTypes.func,

    /** SliderInput */
    sliderMinValue: PropTypes.number,
    sliderMaxValue: PropTypes.number,
});

Exercise.propTypes = {
    fields: PropTypes.arrayOf(fieldModel),
    /** Handled changes in exercise state */
    onChange: PropTypes.func.isRequired
};

export default Exercise;