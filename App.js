import React from 'react';
import { SafeAreaView } from 'react-native';
import DashboardContainer from './src/Containers/DashboardContainer';

const App: () => React$Node = () => (
  <SafeAreaView>
    <DashboardContainer />
  </SafeAreaView>
);

export default App;
