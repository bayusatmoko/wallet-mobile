import React, { Component } from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
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
      isLoading: false,
      balance: 0
    };
  }

  _generateErrorMessage = error => {
    if (error.response) {
      return error.response.data.message;
    }
    return error.message;
  };

  _addTransaction = async newTransaction => {
    const USER_ID = 1;
    try {
      await addTransaction(newTransaction);
      const { data: wallet } = await getWalletByUserId(USER_ID);
      this.setState({ balance: wallet.balance, errorTransaction: '' });
    } catch (error) {
      this.setState({ errorMessage: this._generateErrorMessage(error) });
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
    this.setState({ isLoading: true });
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

  _renderLoading = () => {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
    return (
      <Modal transparent={false} visible={this.state.isLoading}>
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      </Modal>
    );
  };

  render() {
    const { isSubmitted, isLoading } = this.state;
    return (
      <View>
        {isLoading && this._renderLoading()}
        <TransactionForm
          title="Top up your wallet"
          onSubmit={this._handleSubmit}
        />
        {isSubmitted && this._renderNotification()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
});

export default DepositContainer;
