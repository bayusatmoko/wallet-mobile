import React from 'react';
import { Image, Text, View } from 'react-native';
import background from '../background.jpg';
import styles from './walletInfo.style';

export default class UserInfo extends React.PureComponent {
  render() {
    const { user } = this.props;
    const { phoneNumber, name } = user;
    return (
      <>
        <View style={styles.backgroundWallet}>
          <Image style={styles.backgroundImages} source={background} />
          <Text style={styles.textName} testID="user-name">
            {`Hi, ${name}`}
          </Text>
          <Text style={styles.textPhone} testID="user-phone">
            {phoneNumber}
          </Text>
        </View>
      </>
    );
  }
}
