import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import styles from './walletInfo.style';
import sendPayee from '../sendPayee.png';
import PropTypes from 'prop-types';

const PayeeItem = props => {
  const { payee, onPressPayee } = props;

  return (
    <View style={styles.borderPayee}>
      <Text style={styles.textPayee} testID="text-name">
        {payee.nickName}
      </Text>
      <TouchableOpacity onPress={onPressPayee} testID="payee-item">
        <Image style={styles.imagePayee} source={sendPayee} />
      </TouchableOpacity>
    </View>
  );
};

PayeeItem.propTypes = {
  payee: PropTypes.shape({
    nickName: PropTypes.string
  }).isRequired
};

export default PayeeItem;
