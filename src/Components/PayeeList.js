import React from 'react';
import { FlatList, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import PayeeItem from './PayeeItem';
import styles from './walletInfo.style';

const PayeeList = props => {
  const { payees, onPressPayee } = props;

  const _handlePress = item => () => {
    onPressPayee(item);
  };

  let listTitle = 'No payees added';
  if (payees.length > 0) {
    listTitle = 'My Favourite Payees';
  }

  return (
    <View>
      <Text style={styles.payeeTitle}>{listTitle}</Text>
      <FlatList
        data={payees}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item }) => (
          <PayeeItem payee={item} onPressPayee={_handlePress(item)} />
        )}
      />
    </View>
  );
};

PayeeList.propTypes = {
  payees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number.isRequired,
      nickName: PropTypes.string.isRequired,
      payee: PropTypes.shape({
        name: PropTypes.string.isRequired,
        phoneNumber: PropTypes.string.isRequired
      })
    }).isRequired
  ),
  onPressPayee: PropTypes.func.isRequired
};

PayeeList.defaultProps = {
  payees: [
    {
      id: 0,
      name: 'User',
      phoneNumber: '085207574545'
    }
  ]
};

export default PayeeList;
