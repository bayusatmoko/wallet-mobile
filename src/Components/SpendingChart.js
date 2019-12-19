import React from 'react';
import { Dimensions, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import moment from 'moment';
import Balance from './Balance';

class SpendingChart extends React.PureComponent {
  _calculateTransactionData = () => {
    const { transactions, walletId, minDate } = this.props;
    let depositTotal = 0;
    let transferInTotal = 0;
    let transferTotal = 0;
    transactions.forEach(item => {
      if (moment(item.createdAt).isBefore(minDate)) {
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

  _createChartData = (depositTotal, transferInTotal, transferTotal) => {
    return [
      {
        name: 'Deposit',
        population: depositTotal,
        color: 'purple',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12
      },
      {
        name: 'Transfer In',
        population: transferInTotal,
        color: 'orange',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12
      },
      {
        name: 'Transfer Out',
        population: transferTotal,
        color: 'red',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12
      }
    ];
  };

  render() {
    const {
      depositTotal,
      transferInTotal,
      transferTotal
    } = this._calculateTransactionData();
    return (
      <>
        <PieChart
          data={this._createChartData(
            depositTotal,
            transferInTotal,
            transferTotal
          )}
          width={Dimensions.get('window').width}
          height={250}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
          }}
          accessor="population"
          backgroundColor="transparent"
          style={{
            margin: 2
          }}
        />
        <Text>
          {'Total deposit: '}
          <Balance balance={depositTotal} />
        </Text>
        <Text>
          {'Total transfer in: '}
          <Balance balance={transferInTotal} />
        </Text>
        <Text>
          {'Total transfer out: '}
          <Balance balance={transferTotal} />
        </Text>
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
    .subtract(1, 'month')
    .format('YYYY-MM-DD'),
  TWO_MONTH: moment()
    .subtract(2, 'month')
    .format('YYYY-MM-DD'),
  THREE_MONTH: moment()
    .subtract(3, 'month')
    .format('YYYY-MM-DD')
};

export default SpendingChart;
