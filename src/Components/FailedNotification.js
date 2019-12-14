import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

const FailedNotification = props => {
  const { message } = props;
  return (
    <View>
      <Text>Transaction failed! Please try again in a few minutes.</Text>
      <Text testID="text-message">{message}</Text>
    </View>
  );
};

FailedNotification.propTypes = {
  message: PropTypes.string.isRequired
};

export default FailedNotification;
