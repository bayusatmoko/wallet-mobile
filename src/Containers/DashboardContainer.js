import React from 'react';
import LastTransaction from '../Components/LastTransaction';
import MenuComponent from '../Components/MenuComponent';
import UserInfo from '../Components/UserInfo';
import WalletInfo from '../Components/WalletInfo';
import getLastTransactionsByWalletId from '../Services/getLastTransactionsByWalletId';
import getUserById from '../Services/getUserById';
import getWalletByUserId from '../Services/getWalletByUserId';
import Error from '../Components/Error';
import NoTransactionsFound from '../Components/NoTransactionsFound';
import getSessionInfo from '../Utils/getSessionInfo';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

export default class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      walletId: 1,
      token: '',
      wallet: { balance: 0 },
      user: {},
      lastTransactions: [],
      isRefreshing: true,
      errorMessage: ''
    };
  }

  async componentDidMount() {
    const sessionInfo = await getSessionInfo();
    const { token, userId, walletId } = sessionInfo;
    this.setState({ token, userId, walletId });
    await this._refreshData();
  }

  _renderLoading = () => {
    return (
      <Modal transparent={false} visible={this.state.isRefreshing}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Modal>
    );
  };

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
    const { userId, token } = this.state;
    try {
      const response = await getUserById(userId, token);
      this.setState({
        user: response.data,
        errorMessage: ''
      });
    } catch (error) {
      this.setState({
        errorMessage: this._generateErrorMessage(error),
        isRefreshing: false
      });
    }
  };

  _fetchWallet = async () => {
    const { userId, walletId, token } = this.state;
    try {
      const response = await getWalletByUserId(userId, token);
      this.setState({
        wallet: response.data,
        errorMessage: ''
      });
      await this._fetchLastTransaction(walletId, token);
    } catch (error) {
      this.setState({
        errorMessage: this._generateErrorMessage(error),
        isRefreshing: false
      });
    }
  };

  _fetchLastTransaction = async () => {
    const { walletId, token } = this.state;
    try {
      const response = await getLastTransactionsByWalletId(walletId, token);
      this.setState({
        lastTransactions: response.data,
        errorMessage: ''
      });
    } catch (error) {
      this.setState({
        errorMessage: this._generateErrorMessage(error),
        isRefreshing: false
      });
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

  _displayDashboard = () => {
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
  };

  render() {
    const { errorMessage, isRefreshing } = this.state;
    return (
      <>
        {isRefreshing && errorMessage === ''
          ? this._renderLoading()
          : this._displayDashboard()}
      </>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
});
