import React from 'react';
import { View } from 'react-native';
import { Button, Menu, Provider } from 'react-native-paper';
import PropTypes from 'prop-types';

const Dropdown = ({ title, selections }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  console.log('render', visible);
  return (
    <Provider>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button mode='outlined' color='blue' onPress={openMenu}>{title}</Button>}>
          {selections.map((selection, i) => 
            <Menu.Item
                onPress={() => console.log('TODO: Onpress', selection)}
                title={selection.title}/>)}
        </Menu>
      </View>
    </Provider>
  );
};

Dropdown.propTypes = {
    title: PropTypes.string.isRequired,
    selections: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.any,
        title: PropTypes.string
    })).isRequired
}

export default Dropdown;