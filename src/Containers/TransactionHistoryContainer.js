import React from 'react';
import TransactionHistory from '../Components/TransactionHistory';
import getTransactionsByWalletId from '../Services/getTransactionsByWalletId';
import getWalletByUserId from '../Services/getWalletByUserId';
import TransactionFilter from '../Components/TransactionFilter';
import TransactionSort from '../Components/TransactionSort';

export default class TransactionHistoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: {},
      user: {},
      transactions: [],
      searchByDescription: '',
      sortColumn: TransactionSort.COLUMN.DATE,
      orderBy: TransactionSort.ORDER.DESC
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
    const sortedDescription = this._sortTransactions(transactions);
    const filteredDescription = this._filterByDescription(sortedDescription);
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

  _handleSort = (sortColumn, orderBy) => {
    this.setState({ sortColumn, orderBy });
  };

  _sortByDate = () => {
    const { transactions, orderBy } = this.state;
    return [...transactions].sort((a, b) => {
      if (orderBy === 'desc') {
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      }
      return Date.parse(a.createdAt) - Date.parse(b.createdAt);
    });
  };

  _sortTransactions = () => {
    const { sortColumn } = this.state;
    if (sortColumn === 'date') {
      return this._sortByDate();
    }
    return this._sortByNominal();
  };

  render() {
    const { wallet, transactions } = this.state;
    return (
      <>
        <TransactionFilter onHandleDescription={this._handleDescription} />
        <TransactionSort onSort={this._handleSort} />
        <TransactionHistory
          transactions={this._displayTransaction(transactions)}
          walletId={wallet.id}
        />
      </>
    );
  }
}
