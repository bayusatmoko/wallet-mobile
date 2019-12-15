import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import Balance from './Balance';

const SuccessNotification = props => {
  const { balance } = props;
  return (
    <View style={{ marginTop: 80 }}>
      <Text style={{ color: 'green', fontSize: 30, alignSelf: 'center' }}>
        Success!
      </Text>
      <Text style={{ color: 'green', fontSize: 30, alignSelf: 'center' }}>
        {'Your balance: '}
        <Balance balance={balance} />
      </Text>
    </View>
  );
};

SuccessNotification.propTypes = {
  balance: PropTypes.number.isRequired
};

export default SuccessNotification;
