import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';

class LastTransaction extends Component {
  render() {
    const transactions = this.props;
    return (
      <View>
        <FlatList
          horizontal
          testID="categories-flat-list"
          data={transactions}
          renderItem={({ item }) => <Text>{item.amount}</Text>}
        />
      </View>
    );
  }
}
export default LastTransaction;
