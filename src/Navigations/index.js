import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import DashboardContainer from '../Containers/DashboardContainer';

const AppNavigator = createStackNavigator({
  Home: {
    screen: DashboardContainer,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
});

export default AppNavigator;
