import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import DashboardContainer from '../Containers/DashboardContainer';
import DepositContainer from '../Containers/DepositContainer';
import TransferContainer from '../Containers/TransferContainer';
import TransactionHistoryContainer from '../Containers/TransactionHistoryContainer';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: DashboardContainer,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    Transfer: {
      screen: TransferContainer,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Transfer'
      })
    },
    Deposit: {
      screen: DepositContainer
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
  { initialRouteName: 'Home' }
);

export default AppNavigator;
