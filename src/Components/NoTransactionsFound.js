import React from 'react';
import { Text, View } from 'react-native';
import styles from './walletInfo.style';

export default class NoTransactionsFound extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Transactions Doesn't Exist</Text>
      </View>
    );
  }
}
