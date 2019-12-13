import { createStackNavigator } from 'react-navigation-stack';
import DashboardContainer from '../Containers/DashboardContainer';

const AppNavigator = createStackNavigator({
  Home: DashboardContainer
});

export default AppNavigator;
