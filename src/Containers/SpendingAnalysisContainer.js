import React from 'react';
import { View, Picker, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Error from '../Components/Error';
import SpendingChart from '../Components/SpendingChart';
import getTransactionsByWalletId from '../Services/getTransactionsByWalletId';
import getSessionInfo from '../Utils/getSessionInfo';

class SpendingAnalysisContainer extends React.PureComponent {
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
        <View>
          <Picker
            selectedValue={this.state.selectedDateRange}
            style={{ height: 200, width: Dimensions.get('window').width }}
            onValueChange={itemValue =>
              this.setState({ selectedDateRange: itemValue })
            }>
            <Picker.Item
              label="Last week"
              value={SpendingChart.DATE_RANGE.ONE_WEEK}
            />
            <Picker.Item
              label="Last two weeks"
              value={SpendingChart.DATE_RANGE.TWO_WEEK}
            />
            <Picker.Item
              label="Last three weeks"
              value={SpendingChart.DATE_RANGE.THREE_WEEK}
            />
            <Picker.Item
              label="Last month"
              value={SpendingChart.DATE_RANGE.ONE_MONTH}
            />
            <Picker.Item
              label="Last two months"
              value={SpendingChart.DATE_RANGE.TWO_MONTH}
            />
            <Picker.Item
              label="Last three months"
              value={SpendingChart.DATE_RANGE.THREE_MONTH}
            />
          </Picker>
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
