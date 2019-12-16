import React from 'react';
import { Text, View } from 'react-native';
import Balance from './Balance';
import styles from './walletInfo.style';

export default class WalletInfo extends React.PureComponent {
  render() {
    const { wallet } = this.props;
    return (
      <>
        <View style={styles.borderBalance}>
          <Text style={styles.textBalance}>Your Balance:</Text>
          <Text style={styles.textBalance} testID="balance">
            <Balance balance={wallet.balance} />
          </Text>
        </View>
      </>
    );
  }
}
