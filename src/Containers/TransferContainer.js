import React, { Component } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
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
      isSearched: false,
      isLoading: false,
      balance: 0
    };
  }

  _handleSearch = async userEmail => {
    try {
      this.setState({ isLoading: true });
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
    this.setState({ isLoading: true });
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
    const {
      selectedReceiver,
      errorSearch,
      isSubmitted,
      isSearched,
      isLoading
    } = this.state;
    const { name, email } = selectedReceiver;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          {isLoading && this._renderLoading()}
          {!isSearched && <ReceiverSearch onSubmit={this._handleSearch} />}
          {errorSearch !== '' && <FailedNotification message={errorSearch} />}
          {isSearched && (
            <TransactionForm
              onSubmit={this._handleSubmit}
              title={`Transfer to \n${name} \n(${email})`}
            />
          )}
          {isSubmitted && this._renderNotification()}
        </View>
      </TouchableWithoutFeedback>
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

TransferContainer.propTypes = {};

export default TransferContainer;
