import React from 'react';
import { Image, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import calendar from '../Assets/Images/calendar.jpeg';
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10
          }}>
          <View
            style={{
              marginTop: 10,
              marginLeft: '2%'
            }}>
            <Text>Select transaction data:</Text>
          </View>
          <View
            style={{
              borderRadius: 10,
              padding: 10,
              flexDirection: 'row'
            }}>
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              placeholder={{}}
              value={selectedDateRange}
              onValueChange={value =>
                this.setState({ selectedDateRange: value })
              }
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
            <Image
              style={{
                width: 20,
                height: 20,
                marginLeft: 10,
                alignSelf: 'center'
              }}
              source={calendar}
            />
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            width: '95%',
            alignSelf: 'center'
          }}
        />
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
