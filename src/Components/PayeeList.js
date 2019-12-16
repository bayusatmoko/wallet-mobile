import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import PayeeItem from './PayeeItem';

const PayeeList = props => {
  const { payees, onPress } = props;

  const _handlePress = item => () => {
    onPress(item);
  };

  return (
    <FlatList
      data={payees}
      keyExtractor={item => `${item.id}`}
      renderItem={({ item }) => (
        <PayeeItem payee={item} onPress={_handlePress(item)} />
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
        phoneNumber: PropTypes.string.isRequired,
      }).isRequired
    }).isRequired
  ).isRequired,
  onPress: PropTypes.func.isRequired
};

export default PayeeList;
