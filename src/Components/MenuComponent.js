import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import transferImage from '../Assets/Images/transafer.jpeg';
import payeeImage from '../Assets/Images/payee.jpeg';
import transaction from '../Assets/Images/history-image.jpeg';
import NAVIGATION from '../Constants/navigation';
import styles from './walletInfo.style';
import chart from '../chart.png';
import deposit from '../deposit.png';
import transfer from '../transfer.png';
import transactions from '../transactions.png';

export default class MenuComponent extends React.PureComponent {
  _handlePress = menu => () => {
    const { onPress } = this.props;
    onPress(menu);
  };

  render() {
    return (
      <>
        <View style={styles.borderMenu}>
          <TouchableOpacity
            testID="menu-transfer"
            onPress={this._handlePress(NAVIGATION.TRANSFER)}>
            <View style={styles.menuTransfer}>
              <Image style={styles.transferImage} source={transfer} />
              <Text>Transfer</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            testID="menu-deposit"
            onPress={this._handlePress(NAVIGATION.DEPOSIT)}>
            <View style={styles.menuDeposit}>
              <Image style={styles.payeeImage} source={deposit} />
              <Text>Deposit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._handlePress(NAVIGATION.TRANSACTION_HISTORY)}>
            <View style={styles.menuTransaction}>
              <Image style={styles.transactionImage} source={transactions} />
              <Text>Transaction</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._handlePress(NAVIGATION.SPENDING_ANALYSIS)}>
            <View style={styles.menuTransaction}>
              <Image style={styles.transactionImage} source={chart} />
              <Text>Analysis</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.borderDividers} />
      </>
    );
  }
}
