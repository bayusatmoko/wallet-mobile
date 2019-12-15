import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import FailedNotification from '../Components/FailedNotification';
import SuccessNotification from '../Components/SuccessNotification';
import TransactionForm from '../Components/TransactionForm';
import addTransaction from '../Services/addTransaction';
import getWalletByUserId from '../Services/getWalletByUserId';

class DepositContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorTransaction: '',
      isSubmitted: false,
      balance: 0
    };
  }

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

  _updateDashboard = async () => {
    const onRefresh = this.props.navigation.getParam('onRefresh');
    await onRefresh();
  };

  _handleSubmit = async ({ nominal, description }) => {
    const walletId = 1;
    const newTransaction = {
      walletId,
      receiverWalletId: walletId,
      nominal,
      description,
      type: 'DEPOSIT'
    };
    await this._addTransaction(newTransaction);
    this.setState({ isSubmitted: true });
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
    const { isSubmitted } = this.state;
    return (
      <View>
        <TransactionForm
          title="Top up your wallet"
          onSubmit={this._handleSubmit}
        />
        {isSubmitted && this._renderNotification()}
      </View>
    );
  }
}

export default DepositContainer;
