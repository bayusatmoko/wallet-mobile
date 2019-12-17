import React from 'react';
import TransactionHistory from '../Components/TransactionHistory';
import getTransactionsByWalletId from '../Services/getTransactionsByWalletId';
import getWalletByUserId from '../Services/getWalletByUserId';
import { ScrollView, View } from 'react-native';
import TransactionFilter from '../Components/TransactionFilter';
import TransactionSort from '../Components/TransactionSort';
import Error from '../Components/Error';
import NoTransactionsFound from '../Components/NoTransactionsFound';

export default class TransactionHistoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet: {},
      user: {},
      transactions: [],
      error: '',
      searchByDescription: '',
      searchAmount: '',
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
      if (error.response.data.statusCode !== 404) {
        return this.setState({
          error: error.response.data.message
        });
      }
      return this.setState({
        error: TransactionHistoryContainer.DOESNT_EXIST
      });
    }
  };

  _displayTransaction = () => {
    const { wallet, transactions, error } = this.state;
    const sortedDescription = this._sortTransactions(transactions);
    if (error && error !== TransactionHistoryContainer.DOESNT_EXIST) {
      return <Error message={error} />;
    }
    if (transactions.length === 0) {
      return <NoTransactionsFound />;
    }
    const filteredDescription = this._filterByDescription(sortedDescription);
    const filteredAmount = this._filterByAmount(filteredDescription);
    return (
      <>
        <TransactionFilter
          onHandleDescription={this._handleDescription}
          onHandleAmount={this._handleAmount}
        />
        <TransactionSort onSort={this._handleSort} />
        <TransactionHistory
          transactions={filteredAmount}
          walletId={wallet.id}
        />
      </>
    );
  };

  _filterByDescription(list) {
    const { searchByDescription } = this.state;
    return list.filter(transaction =>
      transaction.description.includes(searchByDescription)
    );
  }

  _filterByAmount = list => {
    const { searchAmount } = this.state;
    return list.filter(transaction =>
      transaction.nominal.toString().includes(searchAmount)
    );
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

  _sortByNominal = () => {
    const { transactions, orderBy } = this.state;
    return [...transactions].sort((a, b) => {
      if (orderBy === 'desc') {
        return b.nominal - a.nominal;
      }
      return a.nominal - b.nominal;
    });
  };

  _sortTransactions = () => {
    const { sortColumn } = this.state;
    if (sortColumn === 'date') {
      return this._sortByDate();
    }
    return this._sortByNominal();
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
    return <>{this._displayTransaction()}</>;
  }
}
TransactionHistoryContainer.DOESNT_EXIST = "Transaction doesn't exist!";
