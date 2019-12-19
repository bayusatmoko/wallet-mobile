import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './walletInfo.style';

const FailedNotification = props => {
  const { message } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text} testID="text-message">
        {message}
      </Text>
    </View>
  );
};

FailedNotification.propTypes = {
  message: PropTypes.string.isRequired
};

export default FailedNotification;
