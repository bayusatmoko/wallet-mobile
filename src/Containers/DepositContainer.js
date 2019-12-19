import React from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import FailedNotification from '../Components/FailedNotification';
import SuccessNotification from '../Components/SuccessNotification';
import TransactionForm from '../Components/TransactionForm';
import addTransaction from '../Services/addTransaction';
import getWalletByUserId from '../Services/getWalletByUserId';
import getSessionInfo from '../Utils/getSessionInfo';

class DepositContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      userId: 1,
      walletId: 1,
      errorTransaction: '',
      isSubmitted: false,
      isLoading: false,
      balance: 0
    };
  }

  componentDidMount = async () => {
    const sessionInfo = await getSessionInfo();
    const { token, userId, walletId } = sessionInfo;
    this.setState({ token, userId, walletId });
  };

  _generateErrorMessage = error => {
    if (error.response) {
      return error.response.data.message;
    }
    return error.message;
  };

  _addTransaction = async newTransaction => {
    const { userId, token } = this.state;
    try {
      await addTransaction(newTransaction, token);
      const { data: wallet } = await getWalletByUserId(userId, token);
      this.setState({
        balance: wallet.balance,
        errorTransaction: ''
      });
    } catch (error) {
      this.setState({
        errorTransaction: this._generateErrorMessage(error),
        isLoading: false
      });
    }
  };

  _updateDashboard = async () => {
    const onRefresh = this.props.navigation.getParam('onRefresh');
    await onRefresh();
  };

  _handleSubmit = async ({ nominal, description }) => {
    const { walletId, token } = this.state;
    this.setState({ isLoading: true, errorTransaction: '' });
    const newTransaction = {
      walletId,
      receiverWalletId: walletId,
      nominal,
      description,
      type: 'DEPOSIT'
    };
    await this._addTransaction(newTransaction, token);
    this.setState({ isSubmitted: true });
    await this._updateDashboard();
    this.setState({ isLoading: false });
  };

  _renderNotification = () => {
    const { errorTransaction, balance } = this.state;
    if (errorTransaction) {
      return <FailedNotification message={errorTransaction} />;
    }
    return <SuccessNotification balance={balance} />;
  };

  _renderLoading = () => {
    return (
      <Modal transparent={false} visible={this.state.isLoading}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Modal>
    );
  };

  _renderTransaction = () => {
    const { isSubmitted } = this.state;
    return (
      <>
        <TransactionForm
          title="Top up your wallet"
          onSubmit={this._handleSubmit}
        />
        {isSubmitted && this._renderNotification()}
      </>
    );
  };

  render() {
    const { isLoading, errorTransaction } = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          {isLoading && errorTransaction === ''
            ? this._renderLoading()
            : this._renderTransaction()}
        </ScrollView>
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

export default DepositContainer;
