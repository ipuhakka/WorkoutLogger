import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import { TextInput, Title } from 'react-native-paper';
import {Slider} from '@miblanchard/react-native-slider';
import PropTypes from 'prop-types';
import _ from 'lodash';

const SliderInput = ({title, sliderMinValue, sliderMaxValue, value, onChange}) =>
{
    return <View>
        <Title>{title}</Title>
        <TextInput
            onChangeText={(newValue) => 
            {
                const asInt = parseInt(newValue);

                if (asInt)
                {
                    onChange(asInt);
                }
            }}
            value={value.toString()}
            style={{ margin: 10, width: '25%', height: 50}} />
        <Slider
            value={value}
            onSlidingComplete={newValue => 
            {
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

    value: PropTypes.number.isRequired,

    onChange: PropTypes.func.isRequired
}

export default SliderInput;