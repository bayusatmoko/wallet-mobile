import React from 'react';
import { shallow } from 'enzyme';
import ReceiverList from './ReceiverList';

describe('ReceiverList', () => {
  let receivers;
  let mockedOnPress;
  beforeEach(() => {
    mockedOnPress = jest.fn();
    receivers = [
      {
        id: 1,
        name: 'Fadel',
        wallet: {
          id: 1
        }
      },
      {
        id: 2,
        name: 'Sena',
        wallet: {
          id: 2
        }
      }
    ];
  });
  describe('#render', () => {
    it('should render ReceiverItem with receiver props', () => {
      const wrapper = shallow(
        <ReceiverList receivers={receivers} onPress={mockedOnPress} />
      );

      const ReceiverItem = wrapper.find('FlatList').props().renderItem;
      const receiverItemWrapper = shallow(<ReceiverItem item={receivers[0]} />);

      expect(receiverItemWrapper.props().receiver).toEqual(receivers[0]);
    });

    it('should call onPress={} when ReceiverItem is clicked', () => {
      const wrapper = shallow(
        <ReceiverList receivers={receivers} onPress={mockedOnPress} />
      );

      const ReceiverItem = wrapper.find('FlatList').props().renderItem;
      const receiverItemWrapper = shallow(<ReceiverItem item={receivers[0]} />);
      receiverItemWrapper.simulate('press', receivers[0]);

      expect(mockedOnPress).toHaveBeenCalledWith(receivers[0]);
    });
  });
});
