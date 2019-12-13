import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import TransactionItem from './TransactionItem';

const styles = StyleSheet.create({
  transactionList: {
    marginTop: 150,
    width: '100%',
    flex: 1,
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10
  }
});

class LastTransaction extends Component {
  render() {
    const { transactions } = this.props;
    console.log(transactions);
    return (
      <View style={styles.transactionList}>
        <FlatList
          data={transactions}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
export default LastTransaction;
