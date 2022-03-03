import React, {useState} from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import { Title, Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
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
    paddingHorizontal: 8,
    margin: 2
  },
  modalButtonContainer: {
    flexDirection: 'row',
    flex: 1
  }
});

const DropdownWrapper = ({ title, options, allowAddNew, onAddNew }) => 
{
  const [modalVisible, setModalVisible] = useState(false);

  const [value, setValue] = useState(null);
  const [newItem, setNewItem] = useState(null);

  return (
    <View>
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
              }}>Lisää</Button>
          </View>
        </Modal>
      <Title>{title}</Title>
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
          setValue(item.key);
          console.log('change', item);
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