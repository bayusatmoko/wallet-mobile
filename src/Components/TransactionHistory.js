import React, { Component } from 'react';
import { FlatList } from 'react-native';
import TransactionDetail from './TransactionDetail';

class TransactionHistory extends Component {
  render() {
    const { transactions, walletId } = this.props;
    return (
      <FlatList
        data={transactions}
        renderItem={({ item }) => (
          <TransactionDetail transaction={item} walletId={walletId} />
        )}
        keyExtractor={item => `${item.id}`}
      />
    );
  }
}
export default TransactionHistory;
