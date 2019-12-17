import React from 'react';
import { TouchableOpacity, Text, SafeAreaView, View } from 'react-native';
import SInfo from 'react-native-sensitive-info';
import getUserById from '../Services/getUserById';

export default class ProfileContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: ''
      }
    };
  }
  async componentDidMount() {
    const userId = await SInfo.getItem('userId', {});
    const token = await SInfo.getItem('token', {});
    const user = await getUserById(userId, token);
    this.setState({
      user: user.data
    });
  }

  _logout = async () => {
    const { navigation } = this.props;
    await SInfo.deleteItem('token', {});
    await SInfo.deleteItem('user', {});
    await navigation.navigate('Splash');
  };

  render() {
    const { user } = this.state;
    const nameInitials = user.name.split(' ').map((word, index) => {
      if (index < 2) {
        return word.charAt(0);
      }
    });
    return (
      <SafeAreaView>
        <View style={{ backgroundColor: '#B127FC', padding: 20 }}>
          <View
            style={{
              borderRadius: 50,
              width: 100,
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center'
            }}>
            <Text style={{ fontSize: 70, color: 'whitesmoke' }}>
              {nameInitials}
            </Text>
          </View>
        </View>
        <View style={{ alignSelf: 'center', marginTop: 20, marginBottom: 10 }}>
          <Text style={{ fontSize: 30, color: 'black' }}>{user.name}</Text>
        </View>
        <View
          style={{
            backgroundColor: '#B127FC',
            height: 2,
            width: '90%',
            alignSelf: 'center'
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 20
          }}>
          <Text style={{ fontSize: 15 }}>Phone Number</Text>
          <Text style={{ fontSize: 15 }}>{user.phoneNumber}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 20
          }}>
          <Text style={{ fontSize: 15 }}>Email</Text>
          <Text style={{ fontSize: 15 }}>{user.email}</Text>
        </View>
        <View
          style={{
            width: '90%',
            backgroundColor: '#B127FC',
            alignSelf: 'center',
            borderRadius: 20,
            padding: 15,
            alignItems: 'center'
          }}>
          <TouchableOpacity onPress={this._logout}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
