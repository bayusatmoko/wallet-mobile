import React from 'react';
import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import moment from 'moment';
import TransactionItem from './TransactionItem';

class SpendingChart extends React.PureComponent {
  _calculateTransactionData = () => {
    const { transactions, walletId, minDate } = this.props;
    let depositTotal = 0;
    let transferInTotal = 0;
    let transferTotal = 0;
    transactions.forEach(item => {
      if (moment(item.updatedAt).isBefore(minDate)) {
        return false;
      }
      if (item.type === 'DEPOSIT') {
        depositTotal += item.nominal;
        return true;
      }
      if (Number(item.receiverWalletId) === Number(walletId)) {
        transferInTotal += item.nominal;
        return true;
      }
      transferTotal += item.nominal;
    });
    return { depositTotal, transferInTotal, transferTotal };
  };

  _createChartData = () => {
    const {
      depositTotal,
      transferInTotal,
      transferTotal
    } = this._calculateTransactionData();
    return [
      {
        name: 'Deposit',
        population: depositTotal,
        color: 'rgba(131, 167, 234, 1)',
        borderWidth: 1,
        borderColor: 'black',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
      },
      {
        name: 'Transfer Masuk',
        population: transferInTotal,
        color: 'rgba(120, 167, 120, 1)',
        borderWidth: 1,
        borderColor: 'black',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
      },
      {
        name: 'Transfer Keluar',
        population: transferTotal,
        color: '#F00',
        borderWidth: 1,
        borderColor: 'black',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
      }
    ];
  };

  render() {
    return (
      <>
        <PieChart
          data={this._createChartData()}
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
          style={{
            margin: 2,
            borderRadius: 8
          }}
        />
      </>
    );
  }
}

SpendingChart.DATE_RANGE = {
  ONE_WEEK: moment()
    .subtract(7, 'd')
    .format('YYYY-MM-DD'),
  TWO_WEEK: moment()
    .subtract(14, 'd')
    .format('YYYY-MM-DD'),
  THREE_WEEK: moment()
    .subtract(21, 'd')
    .format('YYYY-MM-DD'),
  ONE_MONTH: moment()
    .subtract(1, 'm')
    .format('YYYY-MM-DD'),
  TWO_MONTH: moment()
    .subtract(2, 'm')
    .format('YYYY-MM-DD'),
  THREE_MONTH: moment()
    .subtract(3, 'm')
    .format('YYYY-MM-DD')
};

export default SpendingChart;
