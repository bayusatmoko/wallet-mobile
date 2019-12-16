import React from 'react';
import { Text, View } from 'react-native';
import styles from './walletInfo.style';
import PropTypes from 'prop-types';

export default class Error extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { message } = this.props;
    return <Text style={styles.textError}>{message}</Text>;
  }
}

Error.propTypes = {
  message: PropTypes.string.isRequired
};
