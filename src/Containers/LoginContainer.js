import React from 'react';
import {
  TouchableOpacity,
  View,
  TextInput,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import SInfo from 'react-native-sensitive-info';
import jwtDecode from 'jwt-decode';
import userLogin from '../Services/userLogin';
import personLogin from '../person-login.png';
import passwordIcon from '../lock.png';
import undraw from '../undraw-login.png';

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
        await SInfo.setItem('token', token, {});
        const decodedUser = jwtDecode(token);
        await SInfo.setItem('userId', String(decodedUser.user.id), {});
        await SInfo.setItem('walletId', String(decodedUser.user.wallet.id), {});
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
      <>
        <View
          style={styles.flexLogin}>
          <View style={styles.borderUsername}>
            <View style={styles.flexUsername}>
              <Image style={styles.imageLogin} source={personLogin} />
              <TextInput
                autoCapitalize="none"
                testID="input-user"
                style={styles.textUsername}
                placeholder="name"
                onChangeText={this._handleNameChange}
                value={username}
              />
            </View>
            <View style={styles.borderDivider} />
            <View style={styles.flexPassword}>
              <Image style={styles.imagePassword} source={passwordIcon} />
              <TextInput
                autoCapitalize="none"
                placeholder="password"
                testID="input-password"
                style={styles.textPassword}
                secureTextEntry
                onChangeText={text => this._handlePasswordChange(text)}
                value={password}
              />
            </View>
            <View style={styles.borderDivider} />
          </View>
          <View>
            <TouchableOpacity title="Login" onPress={this._handlePress}>
              <View style={styles.borderLogin}>
                <Text style={styles.textLogin}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
          {error !== '' && (
            <View style={styles.borderError}>
              <Text style={styles.textError} testID="text-error">
                {error}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.undrawImage}>
          <Image source={undraw} style={{ width: 200, height: 200 }} />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  borderError: {
    alignSelf: 'center',
    backgroundColor: '#ffacae',
    marginTop: 40,
    borderRadius: 10,
    padding: 15
  },
  textError: {
    color: 'black'
  },
  undrawImage: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  textLogin: {
    color: 'white'
  },
  borderLogin: {
    alignSelf: 'center',
    padding: 15,
    backgroundColor: 'purple',
    width: '90%',
    alignItems: 'center',
    borderRadius: 20
  },
  imagePassword: {
    width: 20,
    height: 20,
    marginTop: 8
  },
  borderDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 20
  },
  textPassword: {
    height: 40,
    width: '80%',
    marginLeft: 20
  },
  textUsername: {
    height: 40,
    width: '80%',
    marginLeft: 20
  },
  imageLogin: {
    width: 20,
    height: 30
  },
  flexPassword: {
    flexDirection: 'row',
    marginTop: 20
  },
  flexUsername: {
    flexDirection: 'row'
  },
  borderUsername: {
    width: '90%',
    alignSelf: 'center'
  },
  flexLogin: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 100
  }
});
