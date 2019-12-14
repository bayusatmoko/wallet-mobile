import React from 'react';
import { Text, View, Platform } from 'react-native';
import WalletInfo from '../Components/WalletInfo';
import getUserById from '../Services/getUserById';
import getWalletByUserId from '../Services/getWalletByUserId';
import LastTransaction from '../Components/LastTransaction';
import getLastTransactionsByWalletId from '../Services/getLastTransactionsByWalletId';
import UserInfo from '../Components/UserInfo';
import MenuComponent from '../Components/MenuComponent';

export default class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: {},
      user: {},
      lastTransactions: []
    };
  }

  async componentDidMount() {
    await this._fetchUser();
    await this._fetchWallet();
  }

  _fetchUser = async () => {
    try {
      // const { navigation } = this.props;
      // const id = await navigation.getParam('userId');
      const id = 1;
      const response = await getUserById(id);
      this.setState({
        user: response.data
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  _fetchWallet = async () => {
    try {
      // const { navigation } = this.props;
      // const userId = await navigation.getParam('userId');
      const userId = 1;
      const response = await getWalletByUserId(userId);
      this.setState({
        wallet: response.data
      });
      this._fetchLastTransaction(response.data.id);
    } catch (e) {
      console.log(e.message);
    }
  };

  _fetchLastTransaction = async walletId => {
    try {
      const response = await getLastTransactionsByWalletId(walletId);
      this.setState({
        lastTransactions: response.data
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    const { wallet, user, lastTransactions } = this.state;
    const { navigation } = this.props;
    return (
      <View>
        <UserInfo user={user} />
        <WalletInfo wallet={wallet} />
        <MenuComponent />
        <LastTransaction transactions={lastTransactions} walletId={wallet.id} />
        <MenuComponent navigation={navigation} />
      </View>
    );
  }
}
