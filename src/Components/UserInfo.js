import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './walletInfo.style';
import PropTypes from 'prop-types';
import background from '../Assets/Images/background.jpg';

export default class UserInfo extends React.PureComponent {
  _changeFormatName = (name = UserInfo.name) => {
    const splitName = name.split(' ');
    return splitName[0];
  };

  render() {
    const { user } = this.props;
    const { phoneNumber, name } = user;
    return (
      <>
        <View style={styles.backgroundWallet}>
          <Image style={styles.backgroundImages} source={background} />
          <Text style={styles.textName} testID="user-name">
            {`Hi, ${this._changeFormatName(name)}`}
          </Text>
          <Text style={styles.textPhone} testID="user-phone">
            {phoneNumber}
          </Text>
        </View>
      </>
    );
  }
}

UserInfo.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired
  }).isRequired
};

UserInfo.name = 'User';
