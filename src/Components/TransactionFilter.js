import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import styles from './walletInfo.style';

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

  _handleAmount = text => {
    const { onHandleAmount } = this.props;
    this.setState({
      amount: text
    });
    onHandleAmount(text);
  };

  render() {
    return (
      <View>
        <TextInput
          placeholder="Filter By Description"
          style={styles.inputDescription}
          testID="input-description"
          onChangeText={text => this._handleDescription(text)}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Filter By Amount"
          style={{
            marginLeft: 10,
            borderBottomWidth: 1,
            marginBottom: 30,
            marginTop: 30,
            width: '90%'
          }}
          testID="input-amount"
          onChangeText={text => this._handleAmount(text)}
          autoCapitalize="none"
        />
      </View>
    );
  }
}
export default TransactionFilter;
