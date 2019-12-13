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
    marginBottom: 5
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
  }
});

class TransactionItem extends Component {
  _formatCurrency = amount =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  render() {
    const { transaction } = this.props;
    const { description, type, createdAt, nominal, receiver } = transaction;
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
            <Text testID="receiver">{receiver.user.name}</Text>
          </View>
          <View testID="rightPanel" style={styles.rightPanel}>
            <Text testID="nominal" style={styles.itemTransactionNominal}>
              {this._formatCurrency(nominal)}
            </Text>
            <Text testID="date">{moment(createdAt).format('D-MM-YYYY')}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default TransactionItem;
