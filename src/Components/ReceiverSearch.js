import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { Button, View, TextInput, StyleSheet } from 'react-native';

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
      <View style={styles.container}>
        <Text style={styles.label}>Search Receiver</Text>
        <TextInput
          style={styles.input}
          testID="input"
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={text => this.setState({ query: text })}
          value={query}
        />
        <Button
          style={styles.button}
          testID="button"
          color="#8020AF"
          onPress={this._handleSubmit}
          title="Search"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },
  label: {
    fontWeight: '300',
    color: 'grey'
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginBottom: 10,
    fontSize: 20,
    height: 50
  },
  button: {
    marginVertical: 10
  }
});

ReceiverSearch.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ReceiverSearch;
