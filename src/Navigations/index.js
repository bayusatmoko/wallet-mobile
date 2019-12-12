import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import DummyComponent from '../Components/DummyComponent';
import SmartContainer from '../Containers/SmartContainer';

const MainNavigator = createStackNavigator({
  Home: SmartContainer
});

const AuthNavigator = createStackNavigator({
  Auth: DummyComponent
});

const AppSwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    App: MainNavigator
  },
  {
    initialRouteName: 'App'
  }
);

export default AppSwitchNavigator;
