import React, { Component } from 'react';
import { TextInput, View, Button, StyleSheet } from 'react-native';

class TransactionSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateOrder: 'desc'
    };
  }

  _handleSort = sortColumn => {
    const { onSort } = this.props;
    const { dateOrder } = this.state;
    let updatedOrder;
    if (sortColumn === 'date') {
      updatedOrder = this._changeOrder(dateOrder);
      this.setState({ dateOrder: updatedOrder, nominalOrder: '' });
    }
    onSort(sortColumn, updatedOrder);
  };

  _changeOrder = orderBy => {
    if (orderBy === 'desc') {
      return 'asc';
    }
    return 'desc';
  };

  render() {
    return (
      <View>
        <Button
          title="Date"
          testID="date-toggle"
          onPress={() => {
            this._handleSort('date');
          }}
        />
      </View>
    );
  }
}
export default TransactionSort;
