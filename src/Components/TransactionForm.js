import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

class TransactionForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nominal: '',
      description: '',
      isError: false
    };
  }

  _checkValidInput = nominal => {
    const isInRange = nominal >= 1000 && nominal <= 100000000;
    this.setState({ isError: !isInRange });
    return isInRange;
  };

  _handleSubmit = () => {
    const { nominal, description } = this.state;
    const isDescriptionEmpty = description === '';
    if (isDescriptionEmpty) {
      Alert.alert('Description cannot be empty');
      return false;
    }
    const { onSubmit } = this.props;
    if (this._checkValidInput(nominal, description) && !isDescriptionEmpty) {
      this.setState({ nominal: 0, description: description });
      onSubmit({ nominal, description });
    } else {
      Alert.alert('Amount must be between Rp1.000 and Rp100.000.000');
    }
  };

  _handlePredefined = predefinedValue => {
    this.setState({ nominal: predefinedValue });
  };

  _renderPredefined = () => {
    return (
      <View style={styles.predefinedContainer}>
        <View style={styles.containerButton}>
          <TouchableOpacity
            testID="predefined-10k"
            onPress={() => this._handlePredefined(10000)}>
            <Text style={styles.textValue}>Rp10.000</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            testID="predefined-25k"
            onPress={() => this._handlePredefined(25000)}>
            <Text style={styles.textValue}>Rp25.000</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            testID="predefined-50k"
            onPress={() => this._handlePredefined(50000)}>
            <Text style={styles.textValue}>Rp50.000</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            testID="predefined-100k"
            onPress={() => this._handlePredefined(100000)}>
            <Text style={styles.textValue}>Rp100.000</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const { title } = this.props;
    const { isError, nominal, description } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <TextInput
          placeholder="Amount"
          keyboardType="number-pad"
          style={styles.input}
          testID="input-amount"
          value={nominal.toString()}
          onChangeText={text => {
            this.setState({ nominal: text });
            this._checkValidInput(text);
          }}
        />
        {isError && (
          <Text testID="text-error">
            Amount must be between Rp1.000 and Rp100.000.000
          </Text>
        )}
        {this._renderPredefined()}
        <View>
          <TextInput
            placeholder="Description"
            autoCorrect={false}
            style={styles.input}
            testID="input-description"
            maxLength={30}
            onChangeText={text => this.setState({ description: text })}
          />
          <Text style={styles.descriptionCounter}>{description.length}/30</Text>
        </View>
        <TouchableOpacity
          testID="button"
          color="#8020AF"
          onPress={this._handleSubmit}
          title="Submit">
          <View style={styles.borderButton}>
            <Text style={styles.textButton}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerButton: {
    backgroundColor: '#8127fc',
    padding: '2%',
    borderRadius: 5
  },
  textValue: {
    color: 'white'
  },
  container: {
    margin: 30
  },
  title: {
    backgroundColor: '#b459dc',
    borderRadius: 20,
    overflow: 'hidden',
    padding: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    color: 'white'
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
    fontSize: 15
  },
  predefinedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  borderButton: {
    backgroundColor: '#8127fc',
    width: '90%',
    padding: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    borderRadius: 20
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  }
});

TransactionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default TransactionForm;
