import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import DashboardContainer from '../Containers/DashboardContainer';
import TransactionList from '../Components/TransactionList';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: DashboardContainer,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    TransactionHistory: {
      screen: TransactionList
    }
  },
  { initialRouteName: 'Home' }
);

export default AppNavigator;
