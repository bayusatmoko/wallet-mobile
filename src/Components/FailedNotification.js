import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

const FailedNotification = props => {
  const { message } = props;
  return (
    <View style={{ marginTop: 80 }}>
      <Text style={{ color: 'red', fontSize: 30, alignSelf: 'center' }}>
        Transaction failed! Please try again in a few minutes.
      </Text>
      <Text
        style={{ color: 'green', fontSize: 30, alignSelf: 'center' }}
        testID="text-message">
        {message}
      </Text>
    </View>
  );
};

FailedNotification.propTypes = {
  message: PropTypes.string.isRequired
};

export default FailedNotification;
