import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import moment from 'moment';
import formatCurrency from '../Utils/formatCurrency';
import Intl from 'intl';
import locale from 'intl/locale-data/jsonp/id-ID';

const styles = StyleSheet.create({
  transactionItem: {
    borderRadius: 4,
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
    fontSize: 20
  },
  itemTransactionNominal: {
    fontWeight: 'bold',
    fontSize: 16
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
            <Text testID="type">{type}</Text>
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
              {formatCurrency(nominal)}
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
