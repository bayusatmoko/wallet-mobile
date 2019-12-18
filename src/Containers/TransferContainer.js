import React, { Component } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import SInfo from 'react-native-sensitive-info';
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
import addPayee from '../Services/addPayee';
import SuccessAddPayee from '../Components/SuccessAddPayee';

class TransferContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      walletId: 1,
      token: '',
      selectedReceiver: {},
      payeeSelected: false,
      payees: [],
      errorTransaction: '',
      errorSearch: '',
      isSubmitted: false,
      isSearched: false,
      isLoading: false,
      balance: 0,
      payeeAdded: false
    };
  }

  async componentDidMount() {
    const token = await SInfo.getItem('token', {});
    const userId = await SInfo.getItem('userId', {});
    const walletId = await SInfo.getItem('walletId', {});
    const { data } = await getPayeeByUserId(userId, token);
    this.setState({ token, userId, walletId, payees: data });
  }

  _generateErrorMessage = error => {
    if (error.response) {
      return error.response.data.message;
    }
    return error.message;
  };

  _handleSearch = async userEmail => {
    const { token } = this.state;
    try {
      this.setState({ isLoading: true });
      const { data } = await getUserByEmail(userEmail, token);
      this.setState({
        selectedReceiver: data,
        errorSearch: '',
        isSearched: true,
        isSubmitted: false,
        payeeAdded: false
      });
    } catch (error) {
      this.setState({
        errorSearch: this._generateErrorMessage(error),
        selectedReceiver: {}
      });
    }
  };

  _addTransaction = async newTransaction => {
    const { userId, token } = this.state;
    try {
      await addTransaction(newTransaction, token);
      const { data: wallet } = await getWalletByUserId(userId, token);
      this.setState({ balance: wallet.balance, errorTransaction: '' });
    } catch (error) {
      this.setState({
        errorTransaction: error.response.data.message,
        selectedReceiver: {},
        payeeAdded: false
      });
    }
  };

  _updateDashboard = async () => {
    const onRefresh = this.props.navigation.getParam('onRefresh');
    await onRefresh();
  };

  _handleSubmit = async ({ nominal, description }) => {
    const { selectedReceiver, walletId, token } = this.state;
    const newTransaction = {
      walletId,
      receiverWalletId: selectedReceiver.wallet.id,
      nominal,
      description,
      type: 'TRANSFER'
    };
    this.setState({ isLoading: true });
    await this._addTransaction(newTransaction, token);
    this.setState({ isSubmitted: true, isSearched: false, payeeAdded: false });
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
    const { token } = this.state;
    const { data } = await getUserByEmail(payee.payeeData.email, token);
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
    const { userId, token } = this.state;
    await addPayee(payeeFavourited, token);
    const { data } = await getPayeeByUserId(userId, token);
    this.setState({ payees: data, payeeAdded: true });
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
      isLoading,
      payeeAdded
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
          {!isSearched && !payeeSelected && (
            <PayeeList payees={payees} onPressPayee={this._handlePayee} />
          )}
          {payeeAdded && <SuccessAddPayee />}
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
