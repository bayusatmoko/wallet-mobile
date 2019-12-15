import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import transferImage from '../transafer.jpeg';
import payeeImage from '../payee.jpeg';
import transaction from '../history-image.jpeg';
import styles from './walletInfo.style';
import payee from '../payee-img.jpg';

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
            <View style={{ alignItems: 'center' }}>
              <Image style={styles.transferImage} source={transferImage} />
              <Text>Transfer</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            testID="menu-deposit"
            onPress={this._handlePress('Deposit')}>
            <View style={{ alignItems: 'center', marginLeft: 12 }}>
              <Image style={styles.payeeImage} source={payeeImage} />
              <Text>Deposit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ alignItems: 'center', marginLeft: 15 }}>
              <Image style={styles.payee} source={payee} />
              <Text>Payee</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._handlePress('TransactionHistory')}>
            <View style={{ alignItems: 'center' }}>
              <Image style={styles.transactionImage} source={transaction} />
              <Text>Transaction</Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
