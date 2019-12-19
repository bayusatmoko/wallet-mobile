import React from 'react';
import {
  TouchableOpacity,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  StatusBar,
  StyleSheet
} from 'react-native';
import SInfo from 'react-native-sensitive-info';
import QRCode from 'react-native-qrcode-svg';
import getUserById from '../Services/getUserById';
import getSessionInfo from '../Utils/getSessionInfo';
import phoenix from '../Assets/Images/phoenix.png';
import { Gravatar } from 'react-native-gravatar';

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
    const sessionInfo = await getSessionInfo();
    const { userId, token } = sessionInfo;
    const response = await getUserById(userId, token);
    this.setState({ user: response.data });
  }

  _logout = async () => {
    const { navigation } = this.props;
    await SInfo.deleteItem(getSessionInfo.KEY_TOKEN, {});
    await SInfo.deleteItem(getSessionInfo.KEY_USER_ID, {});
    await SInfo.deleteItem(getSessionInfo.KEY_WALLET_ID, {});
    await navigation.navigate('Splash');
  };

  render() {
    const { user } = this.state;
    return (
      <ScrollView>
        <StatusBar backgroundColor="#B127FC" />
        <View style={styles.borderInitial}>
          <View style={styles.borderGravatar}>
            <Gravatar
              options={{
                email: user.email,
                parameters: { size: '200', d: 'mm' },
                defaultImage: 'retro',
                secure: true
              }}
              style={styles.roundedProfileImage}
            />
          </View>
        </View>
        <SafeAreaView>
          <ScrollView>
            <View
              style={{ alignSelf: 'center', marginTop: 20, marginBottom: 10 }}>
              <Text style={{ fontSize: 30, color: 'black' }} testID="text-name">
                {user.name}
              </Text>
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
              <Text style={{ fontSize: 15 }} testID="text-phone">
                {user.phoneNumber}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 20
              }}>
              <Text style={{ fontSize: 15 }}>Email</Text>
              <Text style={{ fontSize: 15 }} testID="text-email">
                {user.email}
              </Text>
            </View>
            <TouchableOpacity onPress={this._logout} testID="touchable-logout">
              <View
                style={{
                  width: '90%',
                  backgroundColor: '#B127FC',
                  alignSelf: 'center',
                  borderRadius: 20,
                  padding: 15,
                  alignItems: 'center'
                }}>
                <Text
                  style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>
                  Log Out
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: 20,
                  marginTop: 40,
                  marginBottom: 10
                }}>
                Pay Me
              </Text>
              <QRCode
                value={user.email}
                size={200}
                color="black"
                logo={phoenix}
                logoBackgroundColor="white"
                logoMargin={5}
                logoBorderRadius={100}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  roundedProfileImage: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 50
  },
  borderGravatar: {
    alignSelf: 'center',
    marginTop: 50
  },
  borderInitial: {
    backgroundColor: '#B127FC',
    padding: 20,
    height: 200
  },
  contentInitial: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  }
});
