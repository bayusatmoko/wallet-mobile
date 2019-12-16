import React, { Component } from 'react';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import FailedNotification from '../Components/FailedNotification';
import ReceiverSearch from '../Components/ReceiverSearch';
import SuccessNotification from '../Components/SuccessNotification';
import TransactionForm from '../Components/TransactionForm';
import addTransaction from '../Services/addTransaction';
import getUserByEmail from '../Services/getUserByEmaill';
import getWalletByUserId from '../Services/getWalletByUserId';
import getPayeeByUserId from '../Services/getPayeeByUserId';
import PayeeList from '../Components/PayeeList';

class TransferContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedReceiver: {},
      payees: [],
      errorTransaction: '',
      errorSearch: '',
      isSubmitted: false,
      isSearched: false,
      balance: 0
    };
  }

  async componentDidMount() {
    const USER_ID = 1;
    const { data } = await getPayeeByUserId(USER_ID);
    this.setState({ payees: data });
  }

  _handleSearch = async userEmail => {
    try {
      const { data } = await getUserByEmail(userEmail);
      this.setState({
        selectedReceiver: data,
        errorSearch: '',
        isSearched: true,
        isSubmitted: false
      });
    } catch (error) {
      this.setState({
        errorSearch: error.response.data.message,
        selectedReceiver: {}
      });
    }
  };

  _addTransaction = async newTransaction => {
    const USER_ID = 1;
    try {
      await addTransaction(newTransaction);
      const { data: wallet } = await getWalletByUserId(USER_ID);
      this.setState({ balance: wallet.balance, errorTransaction: '' });
    } catch (error) {
      this.setState({
        errorTransaction: error.response.data.message,
        selectedReceiver: {}
      });
    }
  };

  _updateDashboard = async () => {
    const onRefresh = this.props.navigation.getParam('onRefresh');
    await onRefresh();
  };

  _handleSubmit = async ({ nominal, description }) => {
    const { selectedReceiver } = this.state;
    const walletId = 1;
    const newTransaction = {
      walletId,
      receiverWalletId: selectedReceiver.wallet.id,
      nominal,
      description,
      type: 'TRANSFER'
    };
    await this._addTransaction(newTransaction);
    this.setState({ isSubmitted: true, isSearched: false });
    await this._updateDashboard();
  };

  _renderNotification = () => {
    const { errorTransaction, balance } = this.state;
    if (errorTransaction) {
      return <FailedNotification message={errorTransaction} />;
    }
    return <SuccessNotification balance={balance} />;
  };

  render() {
    const {
      selectedReceiver,
      errorSearch,
      isSubmitted,
      isSearched,
      payees
    } = this.state;
    const { name, email } = selectedReceiver;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          {!isSearched && <ReceiverSearch onSubmit={this._handleSearch} />}
          {errorSearch !== '' && <FailedNotification message={errorSearch} />}
          {isSearched && (
            <TransactionForm
              onSubmit={this._handleSubmit}
              title={`Transfer to \n${name} \n(${email})`}
            />
          )}
          {isSubmitted && this._renderNotification()}
          <PayeeList payees={payees} onPress={() => {}} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

TransferContainer.propTypes = {};

export default TransferContainer;
