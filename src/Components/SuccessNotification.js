import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import Balance from './Balance';

const SuccessNotification = props => {
  const { balance } = props;
  return (
    <View>
      <Text>Transaction success!</Text>
      <Text>
        <Balance balance={balance} />
      </Text>
    </View>
  );
};

SuccessNotification.propTypes = {
  balance: PropTypes.number.isRequired
};

export default SuccessNotification;
