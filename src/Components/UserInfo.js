import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import background from '../background.jpg';
import transferImage from '../transafer.jpeg';
import payeeImage from '../payee.jpeg';
import transaction from '../history-image.jpeg';
import styles from './walletInfo.style';

export default class UserInfo extends React.PureComponent {
  _changeFormatPhoneNumber = phoneNumber => {
    const phone = phoneNumber.replace(
      /\D*(\d{4})\D*(\d{4})\D*(\d{4})\D*/,
      '$1 $2 $3'
    );
    return phone;
  };
  render() {
    const { user } = this.props;
    const { phoneNumber, name } = user;
    return (
      <>
        <View style={styles.backgroundWallet}>
          <Image style={styles.backgroundImages} source={background} />
          <Text style={styles.textName} testID="user-name">
            {`Hi, ${name}`}
          </Text>
          <Text style={styles.textPhone} testID="user-phone">
            {this._changeFormatPhoneNumber(phoneNumber)}
          </Text>
        </View>
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
              <Text>Payee</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
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
