import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import search from '../searchs.png';
import qrCode from '../qrcode.png';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            backgroundColor: '#8127fc',
            width: '90%',
            justifyContent: 'center',
            padding: 10,
            borderRadius: 10,
            marginTop: 30
          }}>
          <TouchableOpacity
            testID="button"
            color="#8020AF"
            onPress={this._handleSubmit}
            title="Search">
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <Icon
                name="search"
                color="white"
                size={20}
                style={{ alignSelf: 'center', marginRight: 10 }}
              />
              <Text style={{ alignSelf: 'center', color: 'white' }}>
                SEARCH
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 5 }} />
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            backgroundColor: '#8127fc',
            width: '90%',
            justifyContent: 'center',
            padding: 10,
            borderRadius: 10
          }}>
          <TouchableOpacity
            testID="scan-qr"
            color="#8020AF"
            onPress={() => this.setState({ isScanning: true })}
            title="Scan QR">
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <Icon
                name="qrcode"
                color="white"
                size={20}
                style={{ alignSelf: 'center', marginRight: 10 }}
              />
              <Text style={{ alignSelf: 'center', color: 'white' }}>
                SCAN QR
              </Text>
            </View>
          </TouchableOpacity>
        </View>
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
