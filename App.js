import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import AppNavigator from './src/navigation';
import {styles} from './src/themes';
import {colors} from './src/themes/colors';

export default function App() {
  const SafeAreaApp = () => {
    return (
      <SafeAreaView style={styles.flex}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <AppNavigator />
      </SafeAreaView>
    );
  };

  return <SafeAreaApp />;
}
