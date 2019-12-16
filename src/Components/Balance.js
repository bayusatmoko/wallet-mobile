import React from 'react';
import { Text, View } from 'react-native';
import Intl from 'intl';
import locale from 'intl/locale-data/jsonp/id-ID';
import styles from './walletInfo.style';
import PropTypes from 'prop-types';

class Balance extends React.PureComponent {
  _formatCurrency = amount =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);

  render() {
    const { balance } = this.props;
    return <Text>{this._formatCurrency(balance)}</Text>;
  }
}

Balance.propTypes = {
  balance: PropTypes.number.isRequired
};

export default Balance;
