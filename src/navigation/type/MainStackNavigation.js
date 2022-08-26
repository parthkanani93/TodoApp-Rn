import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackNav} from '../NavigationKeys';
import {StackRoute} from '../NavigationRoutes';

export default function MainStackNavigation() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={StackNav.Home}>
      <Stack.Screen name={StackNav.Home} component={StackRoute.Home} />
      <Stack.Screen name={StackNav.Add} component={StackRoute.Add} />
    </Stack.Navigator>
  );
}
