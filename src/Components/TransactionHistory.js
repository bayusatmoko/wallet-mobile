import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import TransactionDetail from './TransactionDetail';

const styles = StyleSheet.create({
  transactionList: {
    marginTop: 50,
    width: '100%',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10
  }
});

class TransactionHistory extends Component {
  render() {
    const { transactions, walletId } = this.props;
    return (
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <TransactionDetail transaction={item} walletId={walletId} />
        )}
        keyExtractor={item => item.id}
      />
    );
  }
}
export default TransactionHistory;
