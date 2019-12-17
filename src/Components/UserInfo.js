import React from 'react';
import { Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import background from '../Assets/Images/background.jpg';
import styles from './walletInfo.style';

export default class UserInfo extends React.PureComponent {
  _changeFormatName = name => {
    const firstName = name || UserInfo.name;
    const splitName = firstName.split(' ');
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
    name: PropTypes.string,
    phoneNumber: PropTypes.string
  }).isRequired
};

UserInfo.defaultProps = {
  user: {
    name: 'User',
    phoneNumber: '085207574545'
  }
};

UserInfo.name = 'User';
