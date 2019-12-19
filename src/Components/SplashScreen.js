import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import SInfo from 'react-native-sensitive-info';
import getSessionInfo from '../Utils/getSessionInfo';

class SplashScreen extends React.PureComponent {
  async componentDidMount() {
    const token = await SInfo.getItem(getSessionInfo.KEY_TOKEN, {});
    setTimeout(() => {
      if (token) {
        return this.props.navigation.navigate('App');
      }
      return this.props.navigation.navigate('Auth');
    }, 1000);
  }

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
});

export default SplashScreen;
