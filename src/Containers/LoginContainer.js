import React from 'react';
import { Button, View, TextInput, Text } from 'react-native';
import SInfo from 'react-native-sensitive-info';
import jwtDecode from 'jwt-decode';
import findUser from '../Services/findUser';
import userLogin from '../Services/userLogin';

export default class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'fadelay@gmail.com',
      password: 'Bankbtpn99',
      error: 'masih kosong'
    };
  }

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
        await SInfo.setItem('token', token, {});
        const decodedUser = jwtDecode(token);
        await SInfo.setItem('user', JSON.stringify(decodedUser), {});
      }
      this.props.navigation.navigate('Home');
    } catch (error) {
      this.setState({ error: error.response.data.message });
    }
  };

  render() {
    const { username, password } = this.state;
    return (
      <View>
        <View>
          <TextInput
            testID="input-user"
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1
            }}
            placeholder="name"
            onChangeText={this._handleNameChange}
            value={username}
          />
          <TextInput
            testID="input-password"
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1
            }}
            secureTextEntry
            onChangeText={text => this._handlePasswordChange(text)}
            value={password}
          />
          <Button title="Login" onPress={this._handlePress} />
        </View>
        <View>
          <Text>{this.state.error}</Text>
        </View>
      </View>
    );
  }
}
