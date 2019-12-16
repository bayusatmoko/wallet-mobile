import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import transferImage from '../Assets/Images/transafer.jpeg';
import payeeImage from '../Assets/Images/payee.jpeg';
import transaction from '../Assets/Images/history-image.jpeg';
import styles from './walletInfo.style';
import payee from '../Assets/Images/payee-img.jpg';

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
            onPress={this._handlePress('Transfer')}>
            <View style={styles.menuTransfer}>
              <Image style={styles.transferImage} source={transferImage} />
              <Text>Transfer</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            testID="menu-deposit"
            onPress={this._handlePress('Deposit')}>
            <View style={styles.menuDeposit}>
              <Image style={styles.payeeImage} source={payeeImage} />
              <Text>Deposit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.menuPayee}>
              <Image style={styles.payee} source={payee} />
              <Text>Payee</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._handlePress('TransactionHistory')}>
            <View style={styles.menuTransaction}>
              <Image style={styles.transactionImage} source={transaction} />
              <Text>Transaction</Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
