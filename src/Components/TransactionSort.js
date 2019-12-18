import React, { Component } from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';
import sortAscending from '../Assets/Images/sort-ascending.png';
import sortDescending from '../Assets/Images/sort-down.png';

class TransactionSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateOrder: TransactionSort.ORDER.DESC,
      nominalOrder: ''
    };
  }

  _handleSort = sortColumn => {
    const { onSort } = this.props;
    const { dateOrder, nominalOrder } = this.state;
    let updatedOrder;
    if (sortColumn === TransactionSort.COLUMN.DATE) {
      updatedOrder = this._changeOrder(dateOrder);
      this.setState({ dateOrder: updatedOrder, nominalOrder: '' });
    }
    if (sortColumn === TransactionSort.COLUMN.NOMINAL) {
      updatedOrder = this._changeOrder(nominalOrder);
      this.setState({ dateOrder: '', nominalOrder: updatedOrder });
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
    const { dateOrder, nominalOrder } = this.state;
    return (
      <View style={styles.transactionItem}>
        <View testID="leftPanel" style={styles.leftPanel}>
          <Button
            title="Sort by Date"
            testID="date-toggle"
            color="#8020AF"
            onPress={() => {
              this._handleSort(TransactionSort.COLUMN.DATE);
            }}
          />
          {dateOrder === TransactionSort.ORDER.DESC && (
            <Image source={sortDescending} style={styles.sortImage} />
          )}
          {dateOrder === TransactionSort.ORDER.ASC && (
            <Image source={sortAscending} style={styles.sortImage} />
          )}
        </View>
        <View testID="rightPanel" style={styles.rightPanel}>
          {nominalOrder === TransactionSort.ORDER.DESC && (
            <Image source={sortDescending} style={styles.sortImage} />
          )}
          {nominalOrder === TransactionSort.ORDER.ASC && (
            <Image source={sortAscending} style={styles.sortImage} />
          )}
          <Button
            title="Sort by Nominal"
            testID="nominal-toggle"
            color="#8020AF"
            onPress={() => {
              this._handleSort(TransactionSort.COLUMN.NOMINAL);
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  transactionItem: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: 'ghostwhite',
    flexDirection: 'row',
    padding: 10
  },
  leftPanel: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  rightPanel: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  sortImage: {
    width: 20,
    height: 20,
    marginLeft: '5%'
  }
});

TransactionSort.ORDER = {
  DESC: 'desc',
  ASC: 'asc'
};

TransactionSort.COLUMN = {
  DATE: 'date',
  NOMINAL: 'nominal'
};

export default TransactionSort;
