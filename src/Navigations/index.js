import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';
import background from '../Assets/Images/background.jpg';
import SplashScreen from '../Components/SplashScreen';
import DashboardContainer from '../Containers/DashboardContainer';
import DepositContainer from '../Containers/DepositContainer';
import SpendingAnalysisContainer from '../Containers/SpendingAnalysisContainer';
import TransferContainer from '../Containers/TransferContainer';
import TransactionHistoryContainer from '../Containers/TransactionHistoryContainer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import ProfileContainer from '../Containers/ProfileContainer';
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
      screen: LoginContainer,
      backgroundColor: 'black'
    }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: 'black',
      headerTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
      },
      header: null
    }
  }
);

const ProfileNavigator = createStackNavigator(
  {
    Profile: {
      screen: ProfileContainer
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
    },
    Analysis: {
      screen: SpendingAnalysisContainer,
      navigationOptions: {
        title: 'Spending Analysis'
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

const AppBottomNavigator = createMaterialBottomTabNavigator(
  {
    Home: { screen: AppNavigator },
    Profile: { screen: ProfileNavigator }
  },
  {
    initialRouteName: 'Home',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' }
  }
);

const AppSwitchNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Auth: AuthNavigator,
    App: AppBottomNavigator
  },
  {
    initialRouteName: 'Splash'
  }
);

export default AppSwitchNavigator;
