import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import Error from '../Components/Error';
import NoTransactionsFound from '../Components/NoTransactionsFound';
import TransactionFilter from '../Components/TransactionFilter';
import TransactionHistory from '../Components/TransactionHistory';
import TransactionSort from '../Components/TransactionSort';
import getTransactionsByWalletId from '../Services/getTransactionsByWalletId';
import getWalletByUserId from '../Services/getWalletByUserId';
import getSessionInfo from '../Utils/getSessionInfo';

export default class TransactionHistoryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      walletId: 1,
      token: '',
      wallet: {},
      user: {},
      transactions: [],
      error: '',
      isRefreshing: true,
      searchByDescription: '',
      searchAmountMin: 0,
      searchAmountMax: 99999999,
      sortColumn: TransactionSort.COLUMN.DATE,
      orderBy: TransactionSort.ORDER.DESC,
      filterAmount: ''
    };
  }

  async componentDidMount() {
    const sessionInfo = await getSessionInfo();
    const { token, userId, walletId } = sessionInfo;
    this.setState({ token, userId, walletId });
    await this._fetchWallet();
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

  _generateErrorMessage = error => {
    if (error.response) {
      return error.response.data.message;
    }
    return error.message;
  };

  _fetchWallet = async () => {
    const { userId, token } = this.state;
    try {
      const response = await getWalletByUserId(userId, token);
      this.setState({
        wallet: response.data
      });
      this._fetchTransaction(response.data.id);
    } catch (error) {
      this.setState({
        error: this._generateErrorMessage(error),
        isRefreshing: false
      });
    }
  };

  _fetchTransaction = async walletId => {
    const { token } = this.state;
    try {
      const response = await getTransactionsByWalletId(walletId, token);
      this.setState({
        transactions: response.data,
        isRefreshing: false,
        error:
          response.data.length === 0
            ? TransactionHistoryContainer.DOESNT_EXIST
            : ''
      });
    } catch (error) {
      this.setState({
        error: this._generateErrorMessage(error),
        isRefreshing: false
      });
    }
  };

  _displayTransaction = () => {
    const { wallet, transactions, error } = this.state;
    if (error && error !== TransactionHistoryContainer.DOESNT_EXIST) {
      return <Error message={error} />;
    }
    if (transactions.length === 0) {
      return <NoTransactionsFound />;
    }
    const sortedDescription = this._sortTransactions(transactions);
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
    const { searchAmountMin, searchAmountMax } = this.state;
    if (searchAmountMin && searchAmountMax) {
      return list.filter(
        transaction =>
          transaction.nominal >= searchAmountMin &&
          transaction.nominal <= searchAmountMax
      );
    }
    return list;
  };

  _handleSort = (sortColumn, orderBy) => {
    this.setState({ sortColumn, orderBy });
  };

  _sortByDate = () => {
    const { transactions, orderBy } = this.state;
    return [...transactions].sort((firstTransaction, secondTransaction) => {
      if (orderBy === 'desc') {
        return (
          Date.parse(secondTransaction.createdAt) -
          Date.parse(firstTransaction.createdAt)
        );
      }
      return (
        Date.parse(firstTransaction.createdAt) -
        Date.parse(secondTransaction.createdAt)
      );
    });
  };

  _sortByNominal = () => {
    const { transactions, orderBy } = this.state;
    return [...transactions].sort((firstTransaction, secondTransaction) => {
      if (orderBy === 'desc') {
        return secondTransaction.nominal - firstTransaction.nominal;
      }
      return firstTransaction.nominal - secondTransaction.nominal;
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

  _handleAmount = (searchAmountMin, searchAmountMax) => {
    this.setState({ searchAmountMin, searchAmountMax });
  };

  render() {
    const { isRefreshing, error } = this.state;
    return (
      <>
        {isRefreshing && error === ''
          ? this._renderLoading()
          : this._displayTransaction()}
      </>
    );
  }
}
TransactionHistoryContainer.DOESNT_EXIST = "Transaction doesn't exist!";

const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
});
