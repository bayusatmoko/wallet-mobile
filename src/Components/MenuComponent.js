import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import transferImage from '../transafer.jpeg';
import payeeImage from '../payee.jpeg';
import transaction from '../history-image.jpeg';
import styles from './walletInfo.style';
import payee from '../payee-img.jpg';

export default class MenuComponent extends React.PureComponent {
  _handleTransaction = () => {
    const { navigation } = this.props;
    navigation.navigate('TransactionHistory');
  };

  render() {
    return (
      <>
        <View style={styles.borderMenu}>
          <TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
              <Image style={styles.transferImage} source={transferImage} />
              <Text>Transfer</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ alignItems: 'center', marginLeft: 12 }}>
              <Image style={styles.payeeImage} source={payeeImage} />
              <Text>Top Up</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ alignItems: 'center', marginLeft: 15 }}>
              <Image style={styles.payee} source={payee} />
              <Text>Payee</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            testID="menu-transaction-history"
            onPress={this._handleTransaction}>
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
