import React from 'react';
import SInfo from 'react-native-sensitive-info';
import { Button } from 'react-native';
import FailedNotification from '../Components/FailedNotification';
import LastTransaction from '../Components/LastTransaction';
import MenuComponent from '../Components/MenuComponent';
import UserInfo from '../Components/UserInfo';
import WalletInfo from '../Components/WalletInfo';
import getLastTransactionsByWalletId from '../Services/getLastTransactionsByWalletId';
import getUserById from '../Services/getUserById';
import getWalletByUserId from '../Services/getWalletByUserId';
import Error from '../Components/Error';
import NoTransactionsFound from '../Components/NoTransactionsFound';

export default class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: { balance: 0 },
      user: {},
      lastTransactions: [],
      isRefreshing: false,
      errorMessage: ''
    };
  }

  async componentDidMount() {
    await this._refreshData();
  }

  _refreshData = async () => {
    const token = await SInfo.getItem('token', {});
    const userId = await SInfo.getItem('userId', {});
    const walletId = await SInfo.getItem('walletId', {});
    this.setState({ isRefreshing: true });
    await this._fetchUser(userId, token);
    await this._fetchWallet(userId, walletId, token);
    this.setState({ isRefreshing: false });
  };

  _generateErrorMessage = error => {
    if (error.response) {
      return error.response.data.message;
    }
    return error.message;
  };

  _fetchUser = async (id, token) => {
    try {
      const response = await getUserById(id, token);
      this.setState({
        user: response.data
      });
    } catch (error) {
      this.setState({ errorMessage: this._generateErrorMessage(error) });
    }
  };

  _fetchWallet = async (userId, walletId, token) => {
    try {
      const response = await getWalletByUserId(userId, token);
      this.setState({
        wallet: response.data,
        errorMessage: ''
      });
      this._fetchLastTransaction(walletId, token);
    } catch (error) {
      this.setState({ errorMessage: this._generateErrorMessage(error) });
    }
  };

  _fetchLastTransaction = async (walletId, token) => {
    try {
      const response = await getLastTransactionsByWalletId(walletId, token);
      this.setState({
        lastTransactions: response.data,
        errorMessage: ''
      });
    } catch (error) {
      this.setState({ errorMessage: this._generateErrorMessage(error) });
    }
  };

  _handleMenuPress = menuItem => {
    const { navigation } = this.props;
    navigation.navigate(menuItem, { onRefresh: this._refreshData });
  };

  _displayError() {
    const { errorMessage, lastTransactions } = this.state;
    if (errorMessage !== '') {
      return <Error message={errorMessage} />;
    }
    if (lastTransactions.length === 0) {
      return <NoTransactionsFound />;
    }
  }

  _logout = async () => {
    const { navigation } = this.props;
    await SInfo.deleteItem('token', {});
    await SInfo.deleteItem('user', {});
    await navigation.navigate('Splash');
  };

  render() {
    const { wallet, user, lastTransactions, isRefreshing } = this.state;
    return (
      <>
        <UserInfo user={user} />
        <WalletInfo wallet={wallet} />
        <MenuComponent onPress={this._handleMenuPress} />
        {this._displayError()}
        <Button title={'Logout'} onPress={this._logout} />
        <LastTransaction
          isRefreshing={isRefreshing}
          onRefresh={this._refreshData}
          transactions={lastTransactions}
          walletId={wallet.id}
        />
      </>
    );
  }
}
