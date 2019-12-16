import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import TransactionItem from './TransactionItem';
import PropTypes from 'prop-types';

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
          renderItem={({ item }) => (
            <TransactionItem transaction={item} walletId={walletId} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

export default LastTransaction;

LastTransaction.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      walletId: PropTypes.number,
      type: PropTypes.string,
      amount: PropTypes.number,
      description: PropTypes.string,
      receiverWalletId: PropTypes.number,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string
    }).isRequired
  ),
  walletId: PropTypes.number.isRequired
};
