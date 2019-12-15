import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import ReceiverItem from './ReceiverItem';

const ReceiverList = props => {
  const { receivers, onPress } = props;

  const _handlePress = item => () => {
    onPress(item);
  };

  return (
    <FlatList
      data={receivers}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <ReceiverItem receiver={item} onPress={_handlePress(item)} />
      )}
    />
  );
};

ReceiverList.propTypes = {
  receivers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onPress: PropTypes.func.isRequired
};

export default ReceiverList;
