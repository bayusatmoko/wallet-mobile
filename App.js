import React from 'react';
import { createAppContainer } from 'react-navigation';
import AppSwitchNavigator from './src/Navigations';

const AppContainer = createAppContainer(AppSwitchNavigator);

const App: () => React$Node = () => {
  return (
    <>
      <AppContainer />
    </>
  );
};

export default App;
