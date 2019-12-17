import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Balance from './Balance';

const SuccessNotification = props => {
  const { balance } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Success!</Text>
      <Text style={styles.text}>
        {'\nYour balance:\n'}
        <Balance balance={balance} />
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignSelf: 'center',
    padding: 20,
    backgroundColor: '#c1ff9d',
    borderRadius: 10
  },
  text: {
    color: 'green',
    fontSize: 30,
    alignSelf: 'center'
  }
});

SuccessNotification.propTypes = {
  balance: PropTypes.number.isRequired
};

export default SuccessNotification;
