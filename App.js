import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FaIcon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const PlaceHolder = () =>
{
  return (<Text>{'Placeholder'}</Text>);
}

export default function App()
{
  return (
    <NavigationContainer>
      <Tab.Navigator >
        <Tab.Screen 
            name="NewWorkout"
            component={PlaceHolder}
            options={{
              title: 'Uusi treeni',
              tabBarIcon: ({ color }) =>
              {
                  return <FaIcon name='plus' color={color} size={20} />;
              } }} />
        <Tab.Screen 
          name='History'
          component={PlaceHolder}
          options={{
            title: 'Historia',
            tabBarIcon: ({ color }) =>
            {
                return <FaIcon name='history' color={color} size={20} />;
            }
          }} />
        <Tab.Screen 
          name="Statistics"
          component={PlaceHolder}
          options={{ 
            title: 'Tilastot',
            tabBarIcon: ({ color }) =>
            {
                return <FaIcon name='bar-chart' color={color} size={20} />;
            }}} />
      </Tab.Navigator>
    </NavigationContainer>
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
