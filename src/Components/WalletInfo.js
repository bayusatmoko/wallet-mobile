import React from 'react';
import { Text, View, Image, SafeAreaView } from 'react-native';
import Balance from './Balance';
import background from '../background.jpg';
import transferImage from '../transafer.jpeg';
import payeeImage from '../payee.jpeg';
import transaction from '../history-image.jpeg';
import styles from './walletInfo.style';

export default class WalletInfo extends React.PureComponent {
  render() {
    const { wallet } = this.props;
    return (
      <>
        <Balance balance={wallet.balance} />
      </>
    );
  }
}
