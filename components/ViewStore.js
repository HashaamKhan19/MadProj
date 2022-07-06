import * as React from 'react';
import {Text, View} from 'react-native';
import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';

import ViewPlants from './ViewPlants';
import ViewTools from './ViewTools';
import ViewCaring from './ViewCaring';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="plants"
        options={{
          tabBarLabelStyle: {
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
          },
          tabBarIcon: () => <Entypo name="leaf" color={'green'} size={25} />,
        }}
        component={ViewPlants}
      />
      <Tab.Screen
        name="tools"
        options={{
          tabBarLabelStyle: {
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
          },
          tabBarIcon: () => <Entypo name="tools" color={'brown'} size={25} />,
        }}
        component={ViewTools}
      />
      <Tab.Screen
        name="care"
        options={{
          tabBarLabelStyle: {
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
          },
          tabBarIcon: () => <Entypo name="heart" color={'red'} size={25} />,
        }}
        component={ViewCaring}
      />
    </Tab.Navigator>
  );
}
