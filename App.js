/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const storeData = async (newValue) =>
  {
    console.log('store', newValue);
    try 
    {
      await AsyncStorage.setItem(
        '@text',
        newValue
      );
    } catch (error) 
    {
      // Error saving data
      console.log('error occured', error);
    }
  };

  const [text, setText] = useState('initial');

  useEffect(() => {
    async function fetch()
    {
      try 
      {
        const res = await AsyncStorage.getItem('@text');
        console.log('got value', res);
        setText(res);
      } catch (error) 
      {
        // Error saving data
        console.log('error occured', error);
      }
    }

    fetch().catch(err => console.log('caught err'));
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        mode='outlined'
        label="Tallenna jotain Asyncstorageen"
        value={text}
        onChangeText={(newValue) =>
        {
          setText(newValue);
        }}
        value={text}></TextInput>
      <Button
        // raised={true}
        mode='outlined'
        color='blue'
        // dark={true}
        onPress={() => 
        {
          storeData(text);
        }} >Tallenna</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '94%'
  }
});
