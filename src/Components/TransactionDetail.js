import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import formatCurrency from '../Utils/formatCurrency';
import styles from './walletInfo.style';

class TransactionDetail extends Component {
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
    if (transaction.type === TransactionDetail.TYPE.DEPOSIT) {
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
        <View>
          <Text testID="date" style={styles.textDate}>
            {moment(createdAt).format(TransactionDetail.DATEFORMAT)}
          </Text>
        </View>
        <View>
          <View testID="leftPanel" style={styles.leftPanel}>
            <Text
              testID="description"
              style={styles.itemTransactionDescription}>
              {description}
            </Text>
            <Text style={styles.textType} testID="type">
              {type}
            </Text>
          </View>
          <View testID="rightPanel" style={styles.rightPanel}>
            <Text testID="receiver">
              {this._renderSenderReceiver(transaction, walletId)}
            </Text>
            <Text
              testID="nominal"
              style={[
                styles.itemTransactionNominal,
                this._setNominalStyle(transaction, walletId)
              ]}>
              {formatCurrency(nominal)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

TransactionDetail.TYPE = {
  DEPOSIT: 'DEPOSIT',
  TRANSFER: 'TRANSFER'
};
TransactionDetail.DATEFORMAT = 'DD MMM YYYY';

export default TransactionDetail;
