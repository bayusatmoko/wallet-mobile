import React from 'react';
import { Text, View } from 'react-native';

const DummyComponent = props => {
  const { message } = props;

  return (
    <View>
      <Text testID="text">{message}</Text>
    </View>
  );
};

export default DummyComponent;
