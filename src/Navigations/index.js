import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import DashboardContainer from '../Containers/DashboardContainer';
import TransactionHistoryContainer from '../Containers/TransactionHistoryContainer';
import LoginContainer from '../Containers/LoginContainer';

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginContainer
    },
    Home: {
      screen: DashboardContainer,
      navigationOptions: ({ navigation }) => ({
        header: null,
        headerRight: <Text>logout</Text>
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
          alignSelf: 'center'
        }
      })
    }
  },
  { initialRouteName: 'Login' }
);

export default AppNavigator;
