import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import styles from './walletInfo.style';
import sendPayee from '../sendPayee.png';

const PayeeItem = props => {
  const { payee, onPressPayee } = props;

  return (
    <View style={styles.borderPayee}>
      <Text style={styles.textPayee} testID="text-name">
        {payee.nickName}
      </Text>
      <TouchableOpacity onPress={onPressPayee} testID="payee-item">
        <Image style={{ width: 40, height: 40, marginRight: 20 }} source={sendPayee} />
      </TouchableOpacity>
    </View>
  );
};

export default PayeeItem;
