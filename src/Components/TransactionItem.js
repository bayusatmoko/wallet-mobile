import moment from 'moment';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Balance from './Balance';

const styles = StyleSheet.create({
  transactionItem: {
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: 'ghostwhite',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10
  },
  leftPanel: {
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  rightPanel: {
    width: '50%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  itemTransactionDescription: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10
  },
  itemTransactionNominal: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10
  },
  itemTransactionDeposit: {
    color: 'green'
  },
  itemTransactionTransfer: {
    color: 'red'
  }
});

class TransactionItem extends Component {
  _setNominalStyle = (transaction, walletId) => {
    if (
      transaction.type === 'DEPOSIT' ||
      transaction.receiverWalletId === walletId
    ) {
      return styles.itemTransactionDeposit;
    }
    return styles.itemTransactionTransfer;
  };

  _renderSenderReceiver = (transaction, walletId) => {
    if (transaction.type === TransactionItem.TYPE.DEPOSIT) {
      return '';
    }
    if (transaction.receiverWalletId === walletId) {
      return `From ${transaction.sender.user.name}`;
    }
    return `To ${transaction.receiver.user.name}`;
  };

  render() {
    const { transaction, walletId } = this.props;
    const { description, type, createdAt, nominal } = transaction;
    return (
      <TouchableOpacity>
        <View style={styles.transactionItem}>
          <View testID="leftPanel" style={styles.leftPanel}>
            <Text
              testID="description"
              style={styles.itemTransactionDescription}>
              {description}
            </Text>
            <Text testID="type" style={{ marginBottom: 10 }}>
              {type}
            </Text>
            <Text testID="receiver">
              {this._renderSenderReceiver(transaction, walletId)}
            </Text>
          </View>
          <View testID="rightPanel" style={styles.rightPanel}>
            <Text
              testID="nominal"
              style={[
                styles.itemTransactionNominal,
                this._setNominalStyle(transaction, walletId)
              ]}>
              <Balance balance={nominal} />
            </Text>
            <Text testID="date">
              {moment(createdAt).format(TransactionItem.DATEFORMAT)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

TransactionItem.TYPE = {
  DEPOSIT: 'DEPOSIT',
  TRANSFER: 'TRANSFER'
};
TransactionItem.DATEFORMAT = 'D-MM-YYYY';

export default TransactionItem;
