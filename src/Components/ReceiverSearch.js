import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Button, View, TextInput } from 'react-native';

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
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <TextInput
            style={{ width: '80%' }}
            testID="input"
            label="Email"
            autoCapitalize="none"
            onChangeText={text => this.setState({ query: text })}
            value={query}
          />
          <Button
            style={{ width: '20%' }}
            testID="button"
            onPress={this._handleSubmit}
            title="Search"
          />
        </View>
      </>
    );
  }
}

ReceiverSearch.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ReceiverSearch;
