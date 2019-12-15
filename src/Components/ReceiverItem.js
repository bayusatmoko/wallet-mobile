import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ReceiverItem = props => {
  const { receiver, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} testID="receiver-item">
      <Text testID="text-name">{receiver.name}</Text>
    </TouchableOpacity>
  );
};

export default ReceiverItem;
