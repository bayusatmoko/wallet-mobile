import React from 'react';
import getWalletByUserId from '../Services/getWalletByUserId';
import getTransactionsByWalletId from '../Services/getTransactionsByWalletId';
import TransactionHistory from '../Components/TransactionHistory';
import { ScrollView, View } from 'react-native';
import Error from '../Components/Error';
import NoTransactionsFound from '../Components/NoTransactionsFound';

export default class TransactionHistoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: {},
      user: {},
      transactions: [],
      error: ''
    };
  }

  async componentDidMount() {
    await this._fetchWallet();
  }

  _fetchWallet = async () => {
    try {
      // const { navigation } = this.props;
      // const userId = await navigation.getParam('userId');
      const userId = 1;
      const response = await getWalletByUserId(userId);
      this.setState({
        wallet: response.data
      });
      this._fetchTransaction(response.data.id);
    } catch (error) {
      this.setState({
        error: error.message
      });
    }
  };

  _fetchTransaction = async walletId => {
    try {
      const response = await getTransactionsByWalletId(walletId);
      this.setState({
        transactions: response.data
      });
    } catch (error) {
      this.setState({
        error: error.message
      });
    }
  };

  _displayTransaction = () => {
    const { wallet, transactions, error } = this.state;
    if (error) {
      return <Error message={error} />;
    }
    if (transactions.length === 0) {
      return <NoTransactionsFound />;
    }
    return (
      <TransactionHistory transactions={transactions} walletId={wallet.id} />
    );
  };

  render() {
    return <>{this._displayTransaction()}</>;
  }
}
