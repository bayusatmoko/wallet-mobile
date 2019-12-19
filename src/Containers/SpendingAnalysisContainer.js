import React from 'react';
import { View, Picker, Dimensions, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Error from '../Components/Error';
import SpendingChart from '../Components/SpendingChart';
import getTransactionsByWalletId from '../Services/getTransactionsByWalletId';
import getSessionInfo from '../Utils/getSessionInfo';

class SpendingAnalysisContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walletId: 1,
      transactions: [],
      selectedDateRange: SpendingChart.DATE_RANGE.ONE_WEEK,
      error: ''
    };
  }

  async componentDidMount() {
    const sessionInfo = await getSessionInfo();
    const { token, walletId } = sessionInfo;
    this.setState({ token, walletId });
    await this._fetchTransaction(walletId, token);
  }

  _generateErrorMessage = error => {
    if (error.response) {
      return error.response.data.message;
    }
    return error.message;
  };

  _fetchTransaction = async (walletId, token) => {
    try {
      const response = await getTransactionsByWalletId(walletId, token);
      this.setState({
        transactions: response.data,
        error: ''
      });
    } catch (error) {
      this.setState({ error: this._generateErrorMessage(error) });
    }
  };

  render() {
    const { walletId, transactions, error, selectedDateRange } = this.state;
    return (
      <View>
        <View style={{ marginTop: 5 }}>
          <Text>Select transaction data:</Text>
          <RNPickerSelect
            value={selectedDateRange}
            useNativeAndroidPickerStyle={false}
            onValueChange={value => this.setState({ selectedDateRange: value })}
            items={[
              {
                key: 0,
                label: 'Last week',
                value: SpendingChart.DATE_RANGE.ONE_WEEK
              },
              {
                key: 1,
                label: 'Last two week',
                value: SpendingChart.DATE_RANGE.TWO_WEEK
              },
              {
                key: 2,
                label: 'Last three week',
                value: SpendingChart.DATE_RANGE.THREE_WEEK
              },
              {
                key: 3,
                label: 'Last one month',
                value: SpendingChart.DATE_RANGE.ONE_MONTH
              },
              {
                key: 4,
                label: 'Last two months',
                value: SpendingChart.DATE_RANGE.TWO_MONTH
              },
              {
                key: 5,
                label: 'Last three months',
                value: SpendingChart.DATE_RANGE.THREE_MONTH
              }
            ]}
          />
        </View>
        {error !== '' && <Error message={error} />}
        <SpendingChart
          transactions={transactions}
          walletId={Number(walletId)}
          minDate={selectedDateRange}
        />
      </View>
    );
  }
}

export default SpendingAnalysisContainer;
