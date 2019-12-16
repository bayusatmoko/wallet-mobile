import React from 'react';
import { FlatList, View } from 'react-native';
import PropTypes from 'prop-types';
import PayeeItem from './PayeeItem';
import styles from './walletInfo.style';

const PayeeList = props => {
  const { payees, onPressPayee } = props;

  const _handlePress = item => () => {
    onPressPayee(item);
  };

  return (
    <FlatList
      data={payees}
      keyExtractor={item => `${item.id}`}
      renderItem={({ item }) => (
        <PayeeItem payee={item} onPressPayee={_handlePress(item)} />
      )}
    />
  );
};

PayeeList.propTypes = {
  payees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      nickName: PropTypes.string.isRequired,
      payee: PropTypes.shape({
        name: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  ).isRequired,
  onPressPayee: PropTypes.func.isRequired
};

export default PayeeList;
