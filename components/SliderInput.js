import React, { useState, useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import { TextInput, Subheading } from 'react-native-paper';
import {Slider} from '@miblanchard/react-native-slider';
import PropTypes from 'prop-types';
import _ from 'lodash';

const styles = StyleSheet.create({
    textInput: { 
        marginLeft: 0,
        marginRight: 0,
        width: '25%',
        height: 50
    },
});

const SliderInput = ({title, sliderMinValue, sliderMaxValue, value, onChange, style}) =>
{
    const [textState, setTextState] = useState((value || sliderMinValue).toString());

    useEffect(() =>
    {
        setTextState(value);
    }, [value]);

    return <View style={style}>
        <TextInput
            label={title}
            onChangeText={(newValue) => 
            {
                setTextState(newValue);

                const asInt = parseInt(newValue);

                if (asInt)
                {
                    onChange(asInt);
                }
            }}
            value={(textState || '').toString()}
            style={styles.textInput} 
            keyboardType='numeric' />
        <Slider
            value={value}
            onSlidingComplete={newValue => 
            {
                setTextState(newValue[0]);
                onChange(newValue[0]);
            }}
            minimumValue={sliderMinValue} 
            maximumValue={sliderMaxValue} 
            step={1}/>
    </View>;
};

SliderInput.propTypes = {
    title: PropTypes.string.isRequired,

    /** Default range for slider */
    sliderMinValue: PropTypes.number.isRequired,
    sliderMaxValue: PropTypes.number.isRequired,

    /** TODO: Pitäisi olla required? */
    value: PropTypes.number,

    onChange: PropTypes.func.isRequired,

    style: PropTypes.object
}

export default SliderInput;