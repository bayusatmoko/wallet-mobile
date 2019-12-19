import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import SInfo from 'react-native-sensitive-info';
import getUserById from '../Services/getUserById';
import getSessionInfo from '../Utils/getSessionInfo';
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
    // const nameInitials = user.name
    //   .split(' ')
    //   .map((word, index) => {
    //     if (index < 2) {
    //       return word.charAt(0);
    //     }
    //   })
    //   .join('');
    return (
      <>
        <StatusBar backgroundColor="#B127FC" />
        <View style={styles.borderInitial}>
          <View style={styles.borderGravatar}>
            <Gravatar
              options={{
                email: 'teukuhuda.wiratama@gmail.com',
                parameters: { size: '200', d: 'mm' },
                secure: true
              }}
              style={styles.roundedProfileImage}
            />
          </View>
        </View>
        <View style={styles.borderName}>
          <Text style={styles.textName} testID="text-name">
            {user.name}
          </Text>
        </View>
        <View style={styles.borderDivider} />
        <View style={styles.viewPhone}>
          <Text style={styles.textPhone}>Phone Number</Text>
          <Text style={styles.textPhone} testID="text-phone">
            {user.phoneNumber}
          </Text>
        </View>
        <View style={styles.viewEmail}>
          <Text style={styles.textEmail}>Email</Text>
          <Text style={styles.textEmail} testID="text-email">
            {user.email}
          </Text>
        </View>
        <TouchableOpacity onPress={this._logout} testID="touchable-logout">
          <View style={styles.borderButton}>
            <Text style={styles.textSignOut}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  }
}

const styles = StyleSheet.create({
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
  },
  textInitial: {
    fontSize: 70,
    color: 'whitesmoke'
  },
  borderName: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  textName: {
    fontSize: 30,
    color: 'black'
  },
  borderDivider: {
    backgroundColor: '#B127FC',
    height: 2,
    width: '90%',
    alignSelf: 'center'
  },
  textPhone: {
    fontSize: 15
  },
  textEmail: {
    fontSize: 15
  },
  borderButton: {
    width: '90%',
    backgroundColor: '#B127FC',
    alignSelf: 'center',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center'
  },
  textSignOut: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
  },
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
  viewPhone: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20
  },
  viewEmail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20
  }
});
