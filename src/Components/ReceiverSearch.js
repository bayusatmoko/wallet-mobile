import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Text } from 'react-native';
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
        <View>
          <Text style={{ color: 'blue', fontSize: 20, marginLeft: 30, marginTop: 50 }}>
            Search Email Payee
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 50
          }}>
          <TextInput
            style={{ width: '70%', borderBottomWidth: 1, marginLeft: 30 }}
            testID="input"
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={text => this.setState({ query: text })}
            value={query}
          />
          <Button
            style={{ width: '20%', borderWidth: 1 }}
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
