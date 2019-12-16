import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const PayeeItem = props => {
  const { payee, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} testID="payee-item">
      <Text testID="text-name">{payee.nickName}</Text>
    </TouchableOpacity>
  );
};

export default PayeeItem;
