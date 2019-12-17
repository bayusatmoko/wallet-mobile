import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const SuccessAddPayee = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Success</Text>
      <Text style={styles.text}>Payee successfully added</Text>
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
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 5
  }
});

export default SuccessAddPayee;
