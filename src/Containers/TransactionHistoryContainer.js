import React from 'react';
import getWalletByUserId from '../Services/getWalletByUserId';
import getTransactionsByWalletId from '../Services/getTransactionsByWalletId';
import TransactionHistory from '../Components/TransactionHistory';
import { ScrollView, View } from 'react-native';

export default class TransactionHistoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: {},
      user: {},
      transactions: []
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
    } catch (e) {
      console.log(e.message);
    }
  };

  _fetchTransaction = async walletId => {
    try {
      const response = await getTransactionsByWalletId(walletId);
      this.setState({
        transactions: response.data
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    const { wallet, transactions } = this.state;
    return (
      <TransactionHistory transactions={transactions} walletId={wallet.id} />
    );
  }
}
