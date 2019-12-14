import React from 'react';
import { View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import AppSwitchNavigator from './src/Navigations';
import DashboardContainer from './src/Containers/DashboardContainer';

const AppContainer = createAppContainer(AppSwitchNavigator);

const App: () => React$Node = () => {
  return (
    <>
      <AppContainer style={{ top: 'never', bottom: 'never' }} />
    </>
  );
};

export default App;
