import React from 'react';
import { Image, View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import DashboardContainer from '../Containers/DashboardContainer';
import TransactionHistoryContainer from '../Containers/TransactionHistoryContainer';
import background from '../background.jpg';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: DashboardContainer,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    TransactionHistory: {
      screen: TransactionHistoryContainer,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Transaction History',
        headerTitleStyle: {
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 20,
          alignSelf: 'center',
        }
      })
    }
  },
  { initialRouteName: 'Home' }
);

export default AppNavigator;
