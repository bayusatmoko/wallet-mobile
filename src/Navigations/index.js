import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';
import background from '../Assets/Images/background.jpg';
import SplashScreen from '../Components/SplashScreen';
import DashboardContainer from '../Containers/DashboardContainer';
import DepositContainer from '../Containers/DepositContainer';
import TransferContainer from '../Containers/TransferContainer';
import TransactionHistoryContainer from '../Containers/TransactionHistoryContainer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import ProfileContainer from '../Containers/ProfileContainer';
import LoginContainer from '../Containers/LoginContainer';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    cardStyle: {
      backgroundColor: 'white',
      opacity: 0.9
    },
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
      header: null,
      headerTitleStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center'
      }
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

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Icon;
  let iconName = 'home';
  if (routeName === 'Profile') {
    iconName = 'user';
  }
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const AppBottomNavigator = createMaterialBottomTabNavigator(
  {
    Home: { screen: AppNavigator },
    Profile: { screen: ProfileNavigator }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor)
    }),
    barStyle: { backgroundColor: 'rgb(255,255,255)' }
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
