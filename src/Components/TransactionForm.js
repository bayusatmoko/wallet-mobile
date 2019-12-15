import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Button, Text, View, TextInput } from 'react-native';

class TransactionForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nominal: 0,
      description: '',
      isError: false
    };
  }

  _checkIsNominalInRange = nominal => {
    const isInRange = nominal >= 1000 && nominal <= 100000000;
    this.setState({ isError: !isInRange });
    return isInRange;
  };

  _handleSubmit = () => {
    const { nominal, description } = this.state;
    const { onSubmit } = this.props;
    if (this._checkIsNominalInRange(nominal)) {
      onSubmit({ nominal, description });
    }
  };

  render() {
    const { title } = this.props;
    const { isError } = this.state;
    return (
      <View style={{ marginTop: 50 }}>
        <View style={{ backgroundColor: 'lightgrey' }}>
          <Text
            style={{
              marginLeft: 30,
              marginBottom: 20,
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              paddingTop: 15
            }}>
            {title}
          </Text>
        </View>
        <TextInput
          placeholder="Amount"
          style={{
            marginLeft: 30,
            borderBottomWidth: 1,
            marginBottom: 20,
            marginTop: 30
          }}
          testID="input-amount"
          onChangeText={text => {
            this.setState({ nominal: text });
            this._checkIsNominalInRange(text);
          }}
        />
        <TextInput
          placeholder="Description"
          style={{ marginLeft: 30, borderBottomWidth: 1 }}
          testID="input-description"
          onChangeText={text => this.setState({ description: text })}
        />
        <View style={{ marginTop: 30 }}>
          <Button testID="button" onPress={this._handleSubmit} title="Submit" />
          {isError && (
            <Text testID="text-error">
              Transaction amount must be in range of Rp1.000 to Rp100.000.000
            </Text>
          )}
        </View>
      </View>
    );
  }
}

TransactionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default TransactionForm;
