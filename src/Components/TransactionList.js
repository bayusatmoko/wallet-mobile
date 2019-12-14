import React from 'react';
import { Image, Text, View, SafeAreaView } from 'react-native';
import background from '../background.jpg';
import styles from './walletInfo.style';

export default class TransactionList extends React.PureComponent {
  render() {
    // const { transaction } = this.props;
    const transaction = {
      id: 1,
      walletId: 1,
      receiverWalletId: 1,
      type: 'DEPOSIT',
      nominal: 10000000,
      description: 'Salary Deposit',
      createdAt: '2019-12-14T10:29:54.039Z',
      updatedAt: '2019-12-14T10:29:54.039Z',
      receiver: {
        id: 1,
        user: {
          name: 'Fadel'
        }
      },
      sender: {
        id: 1,
        user: {
          name: 'Fadel'
        }
      }
    };
    return (
      <SafeAreaView>
        <View>
          <Text
            style={{ fontSize: 20, alignSelf: 'center', fontWeight: 'bold' }}>
            Transactions
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <View style={{ backgroundColor: 'lightgrey', padding: 10 }}>
            <Text>{transaction.createdAt}</Text>
          </View>
          <View style={{ padding: 10 }}>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                {transaction.type} {transaction.receiver.user.name}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                paddingTop: 10
              }}>
              <Text style={{ color: 'grey' }}>Transfer</Text>
              <Text style={{ color: 'red' }}>- Rp14.000</Text>
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
                flexDirection: 'row',
                paddingTop: 10
              }}>
              <Text style={{ color: 'blue' }}>Detail</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
