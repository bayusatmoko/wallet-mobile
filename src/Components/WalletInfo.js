import React from 'react';
import { Text, View, Image } from 'react-native';
import Balance from './Balance';
import background from '../background.jpg';

export default class WalletInfo extends React.PureComponent {
  render() {
    const { wallet } = this.props;
    const { id, name, balance } = wallet;
    return (
      <View
        style={{
          height: 100,
          borderRadius: 10,
          alignItems: 'center'
        }}>
        <Image
          style={{
            height: 200,
            width: '100%',
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40
          }}
          source={background}
        />
        <Text style={{ position: 'absolute', top: 80 }} testID="wallet-id">
          {id}
        </Text>
        <Text style={{ position: 'absolute', top: 100 }} testID="wallet-name">
          {name}
        </Text>
        <Balance balance={balance} />
        <View
          style={{
            backgroundColor: 'ghostwhite',
            height: 80,
            width: '90%',
            position: 'absolute',
            top: 150,
            borderRadius: 20
          }}
        />
      </View>
    );
  }
}
