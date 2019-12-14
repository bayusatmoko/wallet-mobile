import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import DashboardContainer from '../Containers/DashboardContainer';
import DepositContainer from '../Containers/DepositContainer';
import TransferContainer from '../Containers/TransferContainer';

const navigationOptions = ({ navigation }) => ({
  header: null
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: DashboardContainer,
    navigationOptions
  },
  Transfer: {
    screen: TransferContainer
  },
  Deposit: {
    screen: DepositContainer
  }
});

export default AppNavigator;
