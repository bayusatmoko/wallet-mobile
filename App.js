import React from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';

import AppSwitchNavigator from './src/Navigations';

const AppContainer = createAppContainer(AppSwitchNavigator);

const App: () => React$Node = () => (
  <>
    <AppContainer />
  </>
);

const styles = StyleSheet.create({});

export default App;
