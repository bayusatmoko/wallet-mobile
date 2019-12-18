import SInfo from 'react-native-sensitive-info';
import React from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import FailedNotification from '../Components/FailedNotification';
import SuccessNotification from '../Components/SuccessNotification';
import TransactionForm from '../Components/TransactionForm';
import addTransaction from '../Services/addTransaction';
import getWalletByUserId from '../Services/getWalletByUserId';

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
    const token = await SInfo.getItem('token', {});
    const userId = await SInfo.getItem('userId', {});
    const walletId = await SInfo.getItem('walletId', {});
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
      this.setState({ balance: wallet.balance, errorTransaction: '' });
    } catch (error) {
      this.setState({ errorTransaction: this._generateErrorMessage(error) });
    }
  };

  _updateDashboard = async () => {
    const onRefresh = this.props.navigation.getParam('onRefresh');
    await onRefresh();
  };

  _handleSubmit = async ({ nominal, description }) => {
    const { walletId, token } = this.state;
    const newTransaction = {
      walletId,
      receiverWalletId: walletId,
      nominal,
      description,
      type: 'DEPOSIT'
    };
    this.setState({ isLoading: true });
    await this._addTransaction(newTransaction, token);
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          {isLoading && this._renderLoading()}
          <TransactionForm
            title="Top up your wallet"
            onSubmit={this._handleSubmit}
          />
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

export default DepositContainer;
