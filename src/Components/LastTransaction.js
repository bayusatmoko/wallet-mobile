import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import TransactionItem from './TransactionItem';
import MenuComponent from './MenuComponent';

const styles = StyleSheet.create({
  transactionList: {
    marginTop: 50,
    width: '100%',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10
  }
});

class LastTransaction extends Component {
  render() {
    const { transactions, walletId } = this.props;
    return (
      <View style={styles.transactionList}>
        <FlatList
          data={transactions}
          renderItem={({ item }) => <TransactionItem transaction={item} walletId={walletId}/>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
export default LastTransaction;
