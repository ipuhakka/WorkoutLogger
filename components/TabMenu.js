import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet} from 'react-native'
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    tabMenu: {
        flexDirection: 'row',
        borderColor: 'black',
        borderBottomWidth: 1
    }
});

const TabMenu = ({panes, activeTab, onTabChange}) =>
{
    const menuButtons = panes.map((pane, i) => 
        <Button 
            key={`tab-menu-item-${i}`}
            onPress={() => onTabChange(i)}
            color={i === activeTab ? 'black' : 'blue'}>{pane.title}</Button>);

    return <View>
        <ScrollView 
            style={styles.tabMenu}
            horizontal>
            {menuButtons}
        </ScrollView>
        <ScrollView>{panes.length > 0
            ? panes[activeTab].content
            : null}</ScrollView>
    </View>;
}

TabMenu.propTypes = {
    panes: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        content: PropTypes.any
    })),
    activeTab: PropTypes.number.isRequired,
    onTabChange: PropTypes.func.isRequired
};

export default TabMenu;