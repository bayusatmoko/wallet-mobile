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
      searchByDescription: ''
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

  _displayTransaction = transactions => {
    const filteredDescription = this._filterByDescription(transactions);
    return filteredDescription;
  };

  _filterByDescription(list) {
    const { searchByDescription } = this.state;
    return list.filter(transaction =>
      transaction.description.includes(searchByDescription)
    );
  }

  _handleDescription = newDescription => {
    this.setState({
      searchByDescription: newDescription
    });
  };

  render() {
    const { wallet, transactions } = this.state;
    return (
      <>
        <TransactionFilter onHandleDescription={this._handleDescription} />
        <TransactionHistory
          transactions={this._displayTransaction(transactions)}
          walletId={wallet.id}
        />
      </>
    );
  }
}
