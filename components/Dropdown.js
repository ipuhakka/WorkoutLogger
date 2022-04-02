import React, {useState} from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Subheading, Button, TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  dropdownContainer: {
      flexDirection: 'row',
      flex: 1,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8
  },
  modalButtonContainer: {
    flexDirection: 'row',
    flex: 1
  }
});

/** Controlled dropdown component */
const DropdownWrapper = ({ title, options, allowAddNew, onAddNew, onChange, value, style }) => 
{
  const [modalVisible, setModalVisible] = useState(false);

  const [newItem, setNewItem] = useState(null);

  return (
    <View style={style}>
      <Modal
        visible={modalVisible}>
          <TextInput label='Uusi' onChangeText={(newText) => setNewItem(newText)} value={newItem}/>
          <View style={styles.modalButtonContainer}>
            <Button color='black' onPress={() => setModalVisible(false)}>Peruuta</Button>
            <Button 
              color='blue'
              onPress={() => 
              {
                onAddNew(newItem);
                setNewItem(null);
                setModalVisible(false);
              }}>Lisää</Button>
          </View>
        </Modal>
      <Subheading>{title}</Subheading>
      <Dropdown
        style={[styles.dropdown]}
        search={options.length > 10}
        data={options}
        title={title}
        labelField="title"
        valueField="key"
        placeholder={title}
        value={value}
        onChange={item => 
        {
          onChange(item.key);
        }} />
      {allowAddNew && <Button
        color='blue'
        onPress={() => setModalVisible(true)}>Lisää uusi</Button>}
    </View>
  );
};

Dropdown.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.any,
        title: PropTypes.string
    })),
    allowAddNew: PropTypes.bool,
    onAddNew: PropTypes.func
}

export default DropdownWrapper;