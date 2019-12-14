import React, { PureComponent } from 'react';
import { View, TextInput, Button } from 'react-native';
import PropTypes from 'prop-types';

class ReceiverSearch extends PureComponent {
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
    return (
      <View>
        <TextInput
          testID="input-amount"
          onChangeText={text => this.setState({ nominal: text })}
        />
        <TextInput
          testID="input-description"
          onChangeText={text => this.setState({ description: text })}
        />
        <Button testID="button" onPress={this._handleSubmit} title="Submit" />
      </View>
    );
  }
}

ReceiverSearch.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ReceiverSearch;
