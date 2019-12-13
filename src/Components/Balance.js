import React from 'react';
import { Text } from 'react-native';
import Intl from 'intl';
import locale from 'intl/locale-data/jsonp/id-ID';

class Balance extends React.PureComponent {
  _formatCurrency = amount =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  render() {
    const { balance } = this.props;
    return (
      <Text style={{ position: 'absolute', top: 120 }} testID="balance">
        {this._formatCurrency(balance)}
      </Text>
    );
  }
}

export default Balance;
