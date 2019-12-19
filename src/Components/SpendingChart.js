import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import moment from 'moment';
import DATE from '../Constants/date';
import Balance from './Balance';
import TransactionItem from './TransactionItem';

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
      if (item.type === TransactionItem.TYPE.DEPOSIT) {
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
        legendFontColor: '#2f2f2f',
        legendFontSize: 12
      },
      {
        name: 'Transfer In',
        population: transferInTotal,
        color: '#ef6c00',
        legendFontColor: '#2f2f2f',
        legendFontSize: 12
      },
      {
        name: 'Transfer Out',
        population: transferTotal,
        color: 'red',
        legendFontColor: '#2f2f2f',
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10
          }}>
          <Text>{'Total deposit: '}</Text>
          <Text style={{ fontSize: 20, color: 'purple' }}>
            <Balance balance={depositTotal} />
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#8127fc',
            width: '95%',
            alignSelf: 'center',
            marginBottom: 10
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10
          }}>
          <Text>{'Total transfer in: '}</Text>
          <Text style={{ fontSize: 20, color: '#ef6c00' }}>
            <Balance balance={transferInTotal} />
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: '#ef6c00',
            width: '95%',
            alignSelf: 'center',
            marginBottom: 10
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10
          }}>
          <Text>{'Total transfer out: '}</Text>
          <Text style={{ fontSize: 20, color: 'red' }}>
            <Balance balance={transferTotal} />
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'red',
            width: '95%',
            alignSelf: 'center',
            marginBottom: 10
          }}
        />
      </>
    );
  }
}

SpendingChart.DATE_RANGE = {
  ONE_WEEK: moment()
    .subtract(7, DATE.DAY)
    .format(DATE.FORMAT),
  TWO_WEEK: moment()
    .subtract(14, DATE.DAY)
    .format(DATE.FORMAT),
  THREE_WEEK: moment()
    .subtract(21, DATE.DAY)
    .format(DATE.FORMAT),
  ONE_MONTH: moment()
    .subtract(1, DATE.MONTH)
    .format(DATE.FORMAT),
  TWO_MONTH: moment()
    .subtract(2, DATE.MONTH)
    .format(DATE.FORMAT),
  THREE_MONTH: moment()
    .subtract(3, DATE.MONTH)
    .format(DATE.FORMAT)
};

export default SpendingChart;
