import React from 'react';
import axios from 'axios';
import { Text, View } from 'react-native';
import WalletInfo from '../Components/WalletInfo';

export default class DashboardContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      wallet: {},
      user: {}
    };
  }

  async componentDidMount() {
    await this._fecthUser();
    await this._fetchWallet();
  }

  _fecthUser = async () => {
    const { navigation } = this.props;
    const id = navigation.getParam('userId');
    const fetchUserUrl = `http://localhost:3001/users/${id}`;
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
    const userId = navigation.getParam('userId');
    const fetchWalletUrl = `http://localhost:3001/users/${userId}/wallets`;
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
    return <WalletInfo wallet={walletInfo} />;
  }
}
