import React from 'react';
import { RefreshControl, SafeAreaView } from 'react-native';
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
    this.setState({ isRefreshing: true });
    await this._fetchUser();
    await this._fetchWallet();
    this.setState({ isRefreshing: false });
  };

  _generateErrorMessage = error => {
    if (error.response) {
      return error.response.data.message;
    }
    return error.message;
  };

  _fetchUser = async () => {
    try {
      const id = 1;
      const response = await getUserById(id);
      this.setState({
        user: response.data
      });
    } catch (error) {
      this.setState({ errorMessage: this._generateErrorMessage(error) });
    }
  };

  _fetchWallet = async () => {
    try {
      const userId = 1;
      const response = await getWalletByUserId(userId);
      this.setState({
        wallet: response.data,
        errorMessage: ''
      });
      this._fetchLastTransaction(response.data.id);
    } catch (error) {
      this.setState({ errorMessage: this._generateErrorMessage(error) });
    }
  };

  _fetchLastTransaction = async walletId => {
    try {
      const response = await getLastTransactionsByWalletId(walletId);
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

  render() {
    const { wallet, user, lastTransactions, isRefreshing } = this.state;
    return (
      <>
        <UserInfo user={user} />
        <WalletInfo wallet={wallet} />
        <MenuComponent onPress={this._handleMenuPress} />
        {this._displayError()}
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
