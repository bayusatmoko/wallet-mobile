import React from 'react';
import PropTypes from 'prop-types';
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
    return <>{this._formatCurrency(balance)}</>;
  }
}

Balance.propTypes = {
  balance: PropTypes.number.isRequired
};

export default Balance;
