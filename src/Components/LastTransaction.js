import React, { Component } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import TransactionItem from './TransactionItem';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  transactionList: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    flex: 1
  }
});

class LastTransaction extends Component {
  render() {
    const { transactions, walletId, isRefreshing, onRefresh } = this.props;
    return (
      <>
        <View style={styles.transactionList}>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
            data={transactions}
            renderItem={({ item }) => (
              <TransactionItem transaction={item} walletId={walletId} />
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </>
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
  walletId: PropTypes.number
};

LastTransaction.defaultProps = {
  walletId: 1
};
