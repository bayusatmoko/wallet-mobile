import React from 'react';
import axios from 'axios';
import { Text, View, Platform } from 'react-native';
import WalletInfo from '../Components/WalletInfo';
import UserInfo from '../Components/UserInfo';
import MenuComponent from '../Components/MenuComponent';

const URL =
  Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://172.20.10.6:3000';

export default class DashboardContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      wallet: {},
      user: {}
    };
  }

  async componentDidMount() {
    await this._fetchUser();
    await this._fetchWallet();
  }

  _fetchUser = async () => {
    const { navigation } = this.props;
    const id = 1;
    const fetchUserUrl = `${URL}/users/${id}`;
    try {
      const response = await axios.get(fetchUserUrl);
      this.setState({
        user: response.data
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  _fetchWallet = async () => {
    const { navigation } = this.props;
    const userId = 1;
    const fetchWalletUrl = `${URL}/users/${userId}/wallets`;
    try {
      const response = await axios.get(fetchWalletUrl);
      this.setState({
        wallet: response.data
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    const { wallet, user } = this.state;
    const { navigation } = this.props;
    return (
      <View>
        <UserInfo user={user} />
        <WalletInfo wallet={wallet} />
        <MenuComponent navigation={navigation} />
      </View>
    );
  }
}
