import React from 'react';
import { Text, View } from 'react-native';
import Balance from './Balance';

export default class WalletInfo extends React.PureComponent {
  render() {
    const { wallet } = this.props;
    const { id, name, balance } = wallet;
    return (
      <View>
        <Text testID="wallet-id">{id}</Text>
        <Text testID="wallet-name">{name}</Text>
        <Balance balance={balance} />
      </View>
    );
  }
}
