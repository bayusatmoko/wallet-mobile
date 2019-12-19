import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

class ReceiverSearch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      isScanning: false
    };
  }

  _handleSubmit = data => {
    const { query } = this.state;
    const { onSubmit } = this.props;
    onSubmit(query || data);
  };

  _handleScan = e => {
    this.setState({ query: e.data, isScanning: false });
    this._handleSubmit(e.data);
  };

  _renderScanner = () => (
    <Modal transparent={false} visible={this.state.isScanning}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}>
        <QRCodeScanner
          testID="qr-scanner"
          onRead={this._handleScan}
          // flashMode={QRCodeScanner.Constants.FlashMode.torch}
          topContent={
            <Text style={styles.centerText}>Scan your friend's QR code!</Text>
          }
          bottomContent={
            <Button
              style={styles.button}
              testID="stop-scanning"
              color="#8020AF"
              onPress={() => this.setState({ isScanning: false })}
              title="Stop Scanning"
            />
          }
        />
      </View>
    </Modal>
  );

  render() {
    const { query, isScanning } = this.state;
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
        <View style={{ marginVertical: 5 }} />
        <Button
          style={styles.button}
          testID="scan-qr"
          color="#8020AF"
          onPress={() => this.setState({ isScanning: true })}
          title="Scan QR"
        />
        {isScanning && this._renderScanner()}
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
    marginTop: 200
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  }
});

ReceiverSearch.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ReceiverSearch;
