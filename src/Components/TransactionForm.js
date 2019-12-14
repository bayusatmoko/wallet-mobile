import React, { PureComponent } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import PropTypes from 'prop-types';

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
    const { nominal, description } = this.state;
    const { title } = this.props;
    console.log(title);
    return (
      <View>
        <Text>{title}</Text>
        <TextInput
          style={{ borderWidth: 1 }}
          testID="input-amount"
          onChangeText={text => this.setState({ nominal: text })}
          value={nominal}
        />
        <TextInput
          style={{ borderWidth: 1 }}
          testID="input-description"
          onChangeText={text => this.setState({ description: text })}
          value={description}
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
