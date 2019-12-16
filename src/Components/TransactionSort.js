import React, { Component } from 'react';
import { TextInput, View, Button, StyleSheet } from 'react-native';

class TransactionSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateOrder: TransactionSort.ORDER.DESC
    };
  }

  _handleSort = sortColumn => {
    const { onSort } = this.props;
    const { dateOrder } = this.state;
    let updatedOrder;
    if (sortColumn === TransactionSort.COLUMN.DATE) {
      updatedOrder = this._changeOrder(dateOrder);
      this.setState({ dateOrder: updatedOrder });
    }
    onSort(sortColumn, updatedOrder);
  };

  _changeOrder = orderBy => {
    if (orderBy === TransactionSort.ORDER.DESC) {
      return TransactionSort.ORDER.ASC;
    }
    return TransactionSort.ORDER.DESC;
  };

  render() {
    return (
      <View>
        <Button
          title="Date"
          testID="date-toggle"
          onPress={() => {
            this._handleSort(TransactionSort.COLUMN.DATE);
          }}
        />
      </View>
    );
  }
}

TransactionSort.ORDER = {
  DESC: 'desc',
  ASC: 'asc'
};

TransactionSort.COLUMN = {
  DATE: 'date',
  NOMINAL: 'nominal'
};

export default TransactionSort;
