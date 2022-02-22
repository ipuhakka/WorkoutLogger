/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
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
        onChangeText={(newValue) =>
        {
          setText(newValue);
        }}
        style={styles.input}
        value={text}></TextInput>
      <Button 
        title='Tallenna'
        onPress={() => 
        {
          storeData(text);
        }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '94%'
  }
});
