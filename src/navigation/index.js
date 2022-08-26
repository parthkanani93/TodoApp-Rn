import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigation from './type/MainStackNavigation';
import {Provider} from 'react-redux';
import store from '../redux/store';

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <MainStackNavigation />
      </Provider>
    </NavigationContainer>
  );
}
