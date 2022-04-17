import React, { useState, useEffect, } from 'react';
import { TextInput } from 'react-native-paper';
import _ from 'lodash';
import PropTypes from 'prop-types';

const NumberInput = ({label, value, onChange, style}) =>
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
        style={style}
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
    onChange: PropTypes.func.isRequired,
    style: PropTypes.object
};

export default NumberInput;