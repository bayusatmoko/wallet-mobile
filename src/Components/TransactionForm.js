import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Button, Text, View, TextInput, StyleSheet, Alert } from 'react-native';

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
      this.setState({ nominal: 0, description: '' });
      onSubmit({ nominal, description });
    } else {
      Alert.alert('Amount must be between Rp1.000 and Rp100.000.000');
    }
  };

  render() {
    const { title } = this.props;
    const { isError, description } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          placeholder="Amount"
          keyboardType="numeric"
          style={styles.input}
          testID="input-amount"
          onChangeText={text => {
            this.setState({ nominal: text });
            this._checkIsNominalInRange(text);
          }}
        />
        {isError && (
          <Text testID="text-error">
            Amount must be between Rp1.000 and Rp100.000.000
          </Text>
        )}
        <View>
          <TextInput
            placeholder="Description (Optional)"
            style={styles.input}
            testID="input-description"
            maxLength={30}
            onChangeText={text => this.setState({ description: text })}
          />
          <Text style={styles.descriptionCounter}>{description.length}/30</Text>
        </View>
        <View>
          <Button
            testID="button"
            color="#8020AF"
            onPress={this._handleSubmit}
            title="Submit"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },
  title: {
    backgroundColor: '#eeedf1',
    borderRadius: 20,
    overflow: 'hidden',
    padding: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginBottom: 10,
    fontSize: 20,
    height: 50
  },
  descriptionCounter: {
    marginTop: -10,
    alignSelf: 'flex-end',
    fontSize: 10
  }
});

TransactionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default TransactionForm;