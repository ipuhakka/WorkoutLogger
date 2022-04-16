import React, { useState, useEffect, } from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import _ from 'lodash';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#b0b0b0'
    }
});

const NumberInput = ({label, value, onChange}) =>
{
    const [stringValue, setStringValue] = useState(null);

    useEffect(() =>
    {
        if (!_.isNil(value))
        {
            setStringValue(String(value));
        }
    }, [value]);

    return <TextInput
        style={styles.input}
        label={label}
        value={stringValue}
        keyboardType='numeric'
        onChangeText={(newValue) =>
        {
            const cleanedStringValue = newValue.replace(',', '.');

            setStringValue(cleanedStringValue);

            if (cleanedStringValue === '')
            {
                onChange(null);
            }
            else
            {
                const numericValue = Number(cleanedStringValue);
                if (numericValue !== Number.Nan)
                {
                    onChange(numericValue);
                }
            }
        }}
        />
}

NumberInput.propTypes = {
    value: PropTypes.number,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default NumberInput;