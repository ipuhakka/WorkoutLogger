import React, { useState } from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import { Title } from 'react-native-paper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#c6c6c6',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 5
    },
    arrowContainer: {
        marginRight: 3,
        flex: 1,
        textAlign: 'right'
    },
    contentHidden: {
        display: 'none'
    }
});

const Accordion = ({children, title}) =>
{
    const [isOpen, setIsOpen] = useState(true);

    return <View>
        <TouchableOpacity 
            style={styles.header}
            onPress={() => setIsOpen(!isOpen)}>
                <Title style={styles.titleContainer}>{title}</Title>
            <FeatherIcon style={styles.arrowContainer} name={isOpen ? 'arrow-up' : 'arrow-down'} size={30} />
        </TouchableOpacity>
        <View style={isOpen ? null : styles.contentHidden}>
            {children}
        </View>
    </View>;
}

Accordion.propTypes = {
    children: PropTypes.any,
    title: PropTypes.string
};

export default Accordion;