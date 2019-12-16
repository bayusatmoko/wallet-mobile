import React, { Component } from 'react';
import { TextInput, View, Button, StyleSheet } from 'react-native';

class TransactionFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      amount: null
    };
  }

  _handleDescription = text => {
    const { onHandleDescription } = this.props;
    this.setState({
      description: text
    });
    onHandleDescription(text);
  };

  render() {
    const { description, amount } = this.state;
    return (
      <View>
        <TextInput
          placeholder="Filter By Description"
          style={{
            marginLeft: 10,
            borderBottomWidth: 1,
            marginBottom: 10,
            marginTop: 30,
            width: '90%'
          }}
          testID="input-description"
          onChangeText={text => this._handleDescription(text)}
          autoCapitalize="none"
        />
      </View>
    );
  }
}
export default TransactionFilter;
