import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';
import background from '../Assets/Images/background.jpg';
import SplashScreen from '../Components/SplashScreen';
import DashboardContainer from '../Containers/DashboardContainer';
import DepositContainer from '../Containers/DepositContainer';
import TransferContainer from '../Containers/TransferContainer';
import TransactionHistoryContainer from '../Containers/TransactionHistoryContainer';
import LoginContainer from '../Containers/LoginContainer';

const styles = StyleSheet.create({
  headerBackground: {
    height: '100%',
    width: '100%'
  }
});

const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginContainer
    }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: 'black',
      headerTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center'
      },
      headerBackground: (
        <Image source={background} style={styles.headerBackground} />
      )
    }
  }
);

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: DashboardContainer,
      navigationOptions: {
        header: null
      }
    },
    Transfer: {
      screen: TransferContainer,
      navigationOptions: {
        title: 'TRANSFER'
      }
    },
    Deposit: {
      screen: DepositContainer,
      navigationOptions: {
        title: 'DEPOSIT'
      }
    },
    TransactionHistory: {
      screen: TransactionHistoryContainer,
      navigationOptions: {
        title: 'TRANSACTION HISTORY'
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: 'black',
      headerTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center'
      },
      headerBackground: (
        <Image source={background} style={styles.headerBackground} />
      )
    }
  }
);

const AppSwitchNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Auth: AuthNavigator,
    App: AppNavigator
  },
  {
    initialRouteName: 'Splash'
  }
);

export default AppSwitchNavigator;
