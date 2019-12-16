import React from 'react';
import TransactionHistory from '../Components/TransactionHistory';
import getTransactionsByWalletId from '../Services/getTransactionsByWalletId';
import getWalletByUserId from '../Services/getWalletByUserId';
import { ScrollView, View } from 'react-native';
import TransactionFilter from '../Components/TransactionFilter';

export default class TransactionHistoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: {},
      user: {},
      transactions: [],
      searchByDescription: '',
      searchAmount: ''
    };
  }

  async componentDidMount() {
    await this._fetchWallet();
  }

  _fetchWallet = async () => {
    try {
      const userId = 1;
      const response = await getWalletByUserId(userId);
      this.setState({
        wallet: response.data
      });
      await this._fetchTransaction(response.data.id);
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
      console.error(e);
    }
  };

  _displayTransaction = () => {
    const { transactions } = this.state;
    const filteredDescription = this._filterByDescription(transactions);
    return this._filterByAmount(filteredDescription);
  };

  _filterByDescription = list => {
    const { searchByDescription } = this.state;
    return list.filter(transaction =>
      transaction.description.includes(searchByDescription)
    );
  };

  _filterByAmount = list => {
    const { searchAmount } = this.state;
    return list.filter(transaction =>
      transaction.nominal.toString().includes(searchAmount)
    );
  };

  _handleDescription = newDescription => {
    this.setState({
      searchByDescription: newDescription
    });
  };

  _handleAmount = newAmount => {
    this.setState({
      searchAmount: newAmount
    });
  };

  render() {
    const { wallet, transactions } = this.state;
    return (
      <>
        <TransactionFilter
          onHandleDescription={this._handleDescription}
          onHandleAmount={this._handleAmount}
        />
        <TransactionHistory
          transactions={this._displayTransaction()}
          walletId={wallet.id}
        />
      </>
    );
  }
}
