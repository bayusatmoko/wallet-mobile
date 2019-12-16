import React from 'react';
import { Text, View } from 'react-native';
import styles from './walletInfo.style';

export default class NoTransactionsFound extends React.PureComponent {
  render() {
    return <Text style={styles.textError}>No Transaction Found</Text>;
  }
}
