import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import FailedNotification from '../Components/FailedNotification';
import ReceiverSearch from '../Components/ReceiverSearch';
import SuccessNotification from '../Components/SuccessNotification';
import TransactionForm from '../Components/TransactionForm';
import addTransaction from '../Services/addTransaction';
import getUserByEmail from '../Services/getUserByEmaill';
import getWalletByUserId from '../Services/getWalletByUserId';

class TransferContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedReceiver: {},
      errorTransaction: '',
      errorSearch: '',
      isSubmitted: false,
      balance: 0
    };
  }

  _handleSearch = async userEmail => {
    try {
      const { data } = await getUserByEmail(userEmail);
      this.setState({ selectedReceiver: data, errorSearch: '' });
    } catch (error) {
      this.setState({ errorSearch: error.message });
    }
  };

  _addTransaction = async newTransaction => {
    const USER_ID = 1;
    try {
      await addTransaction(newTransaction);
      const { data: wallet } = await getWalletByUserId(USER_ID);
      this.setState({ balance: wallet.balance, errorTransaction: '' });
    } catch (error) {
      this.setState({ errorTransaction: error.message });
    }
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
    this.setState({ isSubmitted: true });
    await this._addTransaction(newTransaction);
  };

  _renderNotification = () => {
    const { errorTransaction, balance } = this.state;
    if (errorTransaction) {
      return <FailedNotification message={errorTransaction} />;
    }
    return <SuccessNotification balance={balance} />;
  };

  render() {
    const { selectedReceiver, errorSearch, isSubmitted } = this.state;
    const { name, email } = selectedReceiver;
    return (
      <View>
        <ReceiverSearch onSubmit={this._handleSearch} />
        {errorSearch !== '' && <FailedNotification message={errorSearch} />}
        {name && (
          <TransactionForm
            title={`Transfer to ${name} (${email})`}
            onSubmit={this._handleSubmit}
          />
        )}
        {isSubmitted && this._renderNotification()}
      </View>
    );
  }
}

TransferContainer.propTypes = {};

export default TransferContainer;
