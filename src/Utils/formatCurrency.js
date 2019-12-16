import Intl from 'intl';
import locale from 'intl/locale-data/jsonp/id-ID';

const formatCurrency = (amount, currency = 'IDR') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  }).format(amount);
};

export default formatCurrency;
