import React from 'react';
import { SafeAreaView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './src/Navigations';

const AppContainer = createAppContainer(AppNavigator);

const App: () => React$Node = () => {
  return (
    <>
      <AppContainer />
    </>
  );
};

export default App;
