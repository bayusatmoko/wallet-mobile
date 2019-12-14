import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Button, Text, View, TextInput } from 'react-native';

class TransactionForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nominal: 0,
      description: ''
    };
  }

  _handleSubmit = () => {
    const { nominal, description } = this.state;
    const { onSubmit } = this.props;
    onSubmit({ nominal, description });
  };

  render() {
    const { title } = this.props;
    console.log(title);
    return (
      <View>
        <Text>{title}</Text>
        <TextInput
          label="Amount"
          style={{ borderWidth: 1 }}
          testID="input-amount"
          onChangeText={text => this.setState({ nominal: text })}
        />
        <TextInput
          label="Description"
          style={{ borderWidth: 1 }}
          testID="input-description"
          onChangeText={text => this.setState({ description: text })}
        />
        <Button testID="button" onPress={this._handleSubmit} title="Submit" />
      </View>
    );
  }
}

TransactionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default TransactionForm;
