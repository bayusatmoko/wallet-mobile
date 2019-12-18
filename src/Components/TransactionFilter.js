import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';
import styles from './walletInfo.style';

class TransactionFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      amountMinimum: 0,
      amountMaximum: 99999999
    };
  }

  _handleDescription = text => {
    const { onHandleDescription } = this.props;
    this.setState({
      description: text
    });
    onHandleDescription(text);
  };

  _handleAmountMinimum = text => {
    const { onHandleAmount } = this.props;
    const { amountMaximum } = this.state;
    this.setState({
      amountMinimum: text
    });
    onHandleAmount(text, amountMaximum);
  };

  _handleAmountMaximum = text => {
    const { onHandleAmount } = this.props;
    const { amountMinimum } = this.state;
    this.setState({
      amountMaximum: text
    });
    onHandleAmount(amountMinimum, text);
  };

  render() {
    const {amountMinimum, amountMaximum} = this.state;
    return (
      <View>
        <TextInput
          placeholder="Filter By Description"
          style={styles.inputDescription}
          testID="input-description"
          onChangeText={text => this._handleDescription(text)}
          autoCapitalize="none"
        />
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            placeholder="Minimum Amount"
            style={{
              marginLeft: '2%',
              borderBottomWidth: 1,
              marginBottom: 30,
              marginTop: 30,
              width: '40%'
            }}
            testID="input-amount-minimum"
            onChangeText={text => this._handleAmountMinimum(text)}
            autoCapitalize="none"
            value={amountMinimum.toString()}
          />
          <Text
            style={{
              marginLeft: '3%',
              marginRight: '3%',
              borderBottomWidth: 1,
              marginBottom: 30,
              marginTop: 30
            }}>
            {'-'}
          </Text>
          <TextInput
            placeholder="Maximum Amount"
            style={{
              marginRight: '2%',
              borderBottomWidth: 1,
              marginBottom: 30,
              marginTop: 30,
              width: '40%'
            }}
            testID="input-amount-maximum"
            onChangeText={text => this._handleAmountMaximum(text)}
            autoCapitalize="none"
            value={amountMaximum.toString()}
          />
        </View>
      </View>
    );
  }
}
export default TransactionFilter;
