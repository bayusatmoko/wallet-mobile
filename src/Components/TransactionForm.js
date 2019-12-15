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
      <View style={{ marginTop: 50 }}>
        <View style={{ backgroundColor: 'lightgrey' }}>
          <Text style={{ marginLeft: 30, marginBottom: 20, alignSelf: 'center', fontWeight: 'bold', fontSize: 20, paddingTop: 15 }}>{title}</Text>
        </View>
        <TextInput
          placeholder="Amount"
          style={{ marginLeft: 30, borderBottomWidth: 1, marginBottom: 20, marginTop: 30 }}
          testID="input-amount"
          onChangeText={text => this.setState({ nominal: text })}
        />
        <TextInput
          placeholder="Description"
          style={{ marginLeft: 30, borderBottomWidth: 1 }}
          testID="input-description"
          onChangeText={text => this.setState({ description: text })}
        />
        <View style={{marginTop: 30}}>
          <Button testID="button" onPress={this._handleSubmit} title="Submit" />
        </View>
      </View>
    );
  }
}

TransactionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default TransactionForm;
