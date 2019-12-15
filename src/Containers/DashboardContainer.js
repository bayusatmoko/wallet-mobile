import React from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import FailedNotification from '../Components/FailedNotification';
import LastTransaction from '../Components/LastTransaction';
import MenuComponent from '../Components/MenuComponent';
import UserInfo from '../Components/UserInfo';
import WalletInfo from '../Components/WalletInfo';
import getLastTransactionsByWalletId from '../Services/getLastTransactionsByWalletId';
import getUserById from '../Services/getUserById';
import getWalletByUserId from '../Services/getWalletByUserId';

export default class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: {},
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

  _fetchUser = async () => {
    try {
      const id = 1;
      const response = await getUserById(id);
      this.setState({
        user: response.data
      });
    } catch (error) {
      this.setState({ errorMessage: error.message });
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
      this.setState({ errorMessage: error.message });
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
      this.setState({ errorMessage: error.message });
    }
  };

  _handleMenuPress = menuItem => {
    const { navigation } = this.props;
    navigation.navigate(menuItem, { onRefresh: this._refreshData });
  };

  render() {
    const {
      wallet,
      user,
      lastTransactions,
      isRefreshing,
      errorMessage
    } = this.state;
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={this._refreshData}
          />
        }>
        <UserInfo user={user} />
        <WalletInfo wallet={wallet} />
        <MenuComponent onPress={this._handleMenuPress} />
        {errorMessage !== '' && <FailedNotification message={errorMessage} />}
        <LastTransaction transactions={lastTransactions} walletId={wallet.id} />
      </ScrollView>
    );
  }
}
