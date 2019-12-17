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
import getPayeeByUserId from '../Services/getPayeeByUserId';
import PayeeList from '../Components/PayeeList';
import AddPayeeForm from '../Components/AddPayeeForm';
import axios from 'axios';
import addPayee from '../Services/addPayee';

class TransferContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedReceiver: {},
      payeeSelected: false,
      payees: [],
      errorTransaction: '',
      errorSearch: '',
      isSubmitted: false,
      isSearched: false,
      isLoading: false,
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

  _handlePayee = async payee => {
    const { data } = await getUserByEmail(payee.payeeData.email);
    this.setState({
      isSearched: true,
      payeeSelected: true,
      payees: [],
      isSubmitted: false,
      selectedReceiver: {
        name: payee.payeeData.name,
        email: payee.payeeData.email,
        wallet: data.wallet
      }
    });
  };

  _handleFavourite = async payeeFavourited => {
    const USER_ID = 1;
    await addPayee(payeeFavourited);
    const { data } = await getPayeeByUserId(USER_ID);
    this.setState({ payees: data });
  };

  _isFavourited = () => {
    const { payees, selectedReceiver } = this.state;
    return payees.some(payee => payee.payeeUserId === selectedReceiver.id);
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
    const USER_ID = 1;
    const {
      selectedReceiver,
      payeeSelected,
      errorSearch,
      isSubmitted,
      isSearched,
      payees,
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
            <>
              {!payeeSelected && !this._isFavourited() && (
                <AddPayeeForm
                  id={USER_ID}
                  receiverId={selectedReceiver.id}
                  onAddFavourite={this._handleFavourite}
                  receiverName={selectedReceiver.name}
                />
              )}
              <TransactionForm
                onSubmit={this._handleSubmit}
                title={`Transfer to \n${name} \n(${email})`}
              />
            </>
          )}
          {isSubmitted && this._renderNotification()}
          <PayeeList payees={payees} onPressPayee={this._handlePayee} />
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
