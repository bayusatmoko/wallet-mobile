import React from 'react';
import axios from 'axios';
import { Text, View } from 'react-native';
import WalletInfo from '../Components/WalletInfo';
import LastTransaction from '../Components/LastTransaction';
import config from '../../config';

export default class DashboardContainer extends React.PureComponent {
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
      const { navigation } = this.props;
      const id = await navigation.getParam('userId');
      const fetchUserUrl = `${config.API_URL}/users/${id}`;
      const response = await axios.get(fetchUserUrl);
      this.setState({
        user: response.data
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  _fetchWallet = async () => {
    try {
      const { navigation } = this.props;
      const userId = await navigation.getParam('userId');
      const fetchWalletUrl = `${config.API_URL}/users/${userId}/wallets`;
      const response = await axios.get(fetchWalletUrl);
      const walletId = response.data.id;
      await this._fetchLastTransactions(walletId);
      this.setState({
        wallet: response.data
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  _fetchLastTransactions = async walletId => {
    try {
      const fetchLastTransactionsUrl = `${
        config.API_URL
      }/wallets/${walletId}/transactions?limit=5`;
      const response = await axios.get(fetchLastTransactionsUrl);
      this.setState({
        lastTransactions: response.data
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    const { wallet, user, lastTransactions } = this.state;
    // const walletInfo = {
    //   id: wallet.id,
    //   name: user.name,
    //   balance: wallet.balance
    // };
    const walletInfo = {
      id: 1,
      name: 'Huda',
      balance: 523000
    };
    return (
      <>
        <WalletInfo wallet={walletInfo} />
        <LastTransaction transactions={lastTransactions} walletId={wallet.id} />
      </>
    );
  }
}
