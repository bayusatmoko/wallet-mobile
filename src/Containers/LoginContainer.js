import React from 'react';
import { TouchableOpacity, View, TextInput, Text, Image } from 'react-native';
import SInfo from 'react-native-sensitive-info';
import jwtDecode from 'jwt-decode';
import userLogin from '../Services/userLogin';
import personLogin from '../person-login.png';
import passwordIcon from '../lock.png';
import getSessionInfo from '../Utils/getSessionInfo';

export default class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    };
  }

  _generateErrorMessage = error => {
    if (error.response) {
      return error.response.data.message;
    }
    return error.message;
  };

  _handleNameChange = text => {
    this.setState({ username: text });
  };

  _handlePasswordChange = text => {
    this.setState({ password: text });
  };

  _handlePress = async () => {
    const { username, password } = this.state;
    try {
      const response = await userLogin({ username, password });
      if (response.data) {
        const token = response.data.token;
        await SInfo.setItem(getSessionInfo.KEY_TOKEN, token, {});
        const decodedUser = jwtDecode(token);
        await SInfo.setItem(
          getSessionInfo.KEY_USER_ID,
          String(decodedUser.user.id),
          {}
        );
        await SInfo.setItem(
          getSessionInfo.KEY_WALLET_ID,
          String(decodedUser.user.wallet.id),
          {}
        );
      }
      this.setState({ error: '' });
      this.props.navigation.navigate('Splash');
    } catch (error) {
      this.setState({ error: this._generateErrorMessage(error) });
    }
  };

  render() {
    const { username, password, error } = this.state;
    return (
      <View
        style={{
          width: '100%',
          alignSelf: 'center',
          flex: 1,
          justifyContent: 'center'
        }}>
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <View style={{ flexDirection: 'row' }}>
            <Image style={{ width: 20, height: 30 }} source={personLogin} />
            <TextInput
              autoCapitalize="none"
              testID="input-user"
              style={{
                height: 40,
                width: '80%',
                marginLeft: 20
              }}
              placeholder="name"
              onChangeText={this._handleNameChange}
              value={username}
            />
          </View>
          <View style={{ borderBottomWidth: 1, borderBottomColor: 'black' }} />
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Image
              style={{ width: 20, height: 20, marginTop: 8 }}
              source={passwordIcon}
            />
            <TextInput
              autoCapitalize="none"
              placeholder="password"
              testID="input-password"
              style={{
                height: 40,
                width: '80%',
                marginLeft: 20
              }}
              secureTextEntry
              onChangeText={text => this._handlePasswordChange(text)}
              value={password}
            />
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'black',
              marginBottom: 20
            }}
          />
        </View>
        <TouchableOpacity title="Login" onPress={this._handlePress}>
          <View
            style={{
              alignSelf: 'center',
              padding: 15,
              backgroundColor: 'purple',
              width: '90%',
              alignItems: 'center',
              borderRadius: 20
            }}>
            <Text style={{ color: 'white' }}>Login</Text>
          </View>
        </TouchableOpacity>
        <View>
          <Text testID="text-error">{error}</Text>
        </View>
      </View>
    );
  }
}
