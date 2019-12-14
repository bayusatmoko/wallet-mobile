import React, { PureComponent } from 'react';
import { View, TextInput, Button } from 'react-native';
import PropTypes from 'prop-types';

class ReceiverSearch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  _handleSubmit = () => {
    const { query } = this.state;
    const { onSubmit } = this.props;
    onSubmit(query);
  };

  render() {
    const { query } = this.state;
    return (
      <View>
        <TextInput
          style={{ borderWidth: 1 }}
          testID="input"
          onChangeText={text => this.setState({ query: text })}
          value={query}
        />
        <Button testID="button" onPress={this._handleSubmit} title="Search" />
      </View>
    );
  }
}

ReceiverSearch.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ReceiverSearch;
