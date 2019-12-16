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
      </View>
    );
  }
}
export default TransactionFilter;
