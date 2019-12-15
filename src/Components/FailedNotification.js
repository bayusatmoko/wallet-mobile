import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const FailedNotification = props => {
  const { message } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'An error has occured!\n'}</Text>
      <Text style={styles.text} testID="text-message">
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignSelf: 'center',
    padding: 20,
    backgroundColor: '#ffacae',
    borderRadius: 10
  },
  text: {
    color: 'red',
    fontSize: 30,
    alignSelf: 'center'
  }
});

FailedNotification.propTypes = {
  message: PropTypes.string.isRequired
};

export default FailedNotification;
