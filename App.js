import React from 'react';
import { createAppContainer } from 'react-navigation';
import AppSwitchNavigator from './src/Navigations';
import DashboardContainer from './src/Containers/DashboardContainer';

const AppContainer = createAppContainer(AppSwitchNavigator);

const App: () => React$Node = () => {
  return <AppContainer />;
}

export default App;
