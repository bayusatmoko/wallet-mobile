import React from 'react';
import SInfo from 'react-native-sensitive-info';
import { LineChart, PieChart } from 'react-native-chart-kit';
import TransactionHistory from '../Components/TransactionHistory';
import getTransactionsByWalletId from '../Services/getTransactionsByWalletId';
import getWalletByUserId from '../Services/getWalletByUserId';
import { Dimensions } from 'react-native';
import TransactionFilter from '../Components/TransactionFilter';
import TransactionSort from '../Components/TransactionSort';
import Error from '../Components/Error';
import NoTransactionsFound from '../Components/NoTransactionsFound';
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
      this.setState({ error: this._generateErrorMessage(error) });
    }
  };

  _fetchTransaction = async walletId => {
    const { token } = this.state;
    try {
      const response = await getTransactionsByWalletId(walletId, token);
      this.setState({
        transactions: response.data
      });
    } catch (error) {
      this.setState({ error: this._generateErrorMessage(error) });
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

  _calculateTransactionData = () => {
    const { transactions, walletId } = this.state;
    let depositTotal = 0;
    let transferInTotal = 0;
    let transferTotal = 0;
    transactions.forEach(item => {
      if (item.type === 'DEPOSIT') {
        depositTotal += item.nominal;
        return true;
      }
      if (item.receiverWalletId === Number(walletId)) {
        transferInTotal += item.nominal;
        return true;
      }
      transferTotal += item.nominal;
    });
    return { depositTotal, transferInTotal, transferTotal };
  };

  render() {
    const chartData = [
      {
        name: 'Deposit',
        population: this._calculateTransactionData().depositTotal,
        color: 'rgba(131, 167, 234, 1)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
      },
      {
        name: 'Transfer Masuk',
        population: this._calculateTransactionData().transferInTotal,
        color: 'rgba(120, 167, 120, 1)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
      },
      {
        name: 'Transfer Keluar',
        population: this._calculateTransactionData().transferTotal,
        color: '#F00',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
      }
    ];
    return (
      <>
        <PieChart
          data={chartData}
          width={Dimensions.get('window').width}
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={{
            margin: 8,
            borderRadius: 16
          }}
        />
        {this._displayTransaction()}
      </>
    );
  }
}
TransactionHistoryContainer.DOESNT_EXIST = "Transaction doesn't exist!";
