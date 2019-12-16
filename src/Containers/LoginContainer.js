import React from 'react';
import { Button, View, TextInput, Text } from 'react-native';
import SInfo from 'react-native-sensitive-info';
import findUser from '../Services/findUser';

export default class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'fadelay@gmail.com',
      password: 'Bankbtpn99',
      error: 'masih kosong'
    };
  }

  async componentDidMount() {
    await SInfo.deleteItem('isLogin', {});
    const isLogin = await SInfo.getItem('isLogin', {});
    if (isLogin === 'true') {
      this.props.navigation.navigate('Home');
    }
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
      const response = await findUser(username, password);
      if (response.data) {
        await SInfo.setItem('isLogin', 'true', {});
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
