import React from 'react';
import { shallow } from 'enzyme';
import PayeeList from './PayeeList';

describe('ReceiverList', () => {
  let payees;
  let mockedOnPress;
  beforeEach(() => {
    mockedOnPress = jest.fn();
    payees = [
      {
        id: 1,
        userId: 1,
        payeeId: 2,
        nickName: 'Si Upin',
        payee: {
          name: 'Fadel',
          email: 'fadelcf@gmail.com',
          phoneNumber: '081234567890'
        }
      }
    ];
  });
  describe('#render', () => {
    it('should render ReceiverItem with receiver props', () => {
      const wrapper = shallow(
        <PayeeList payees={payees} onPress={mockedOnPress} />
      );

      const PayeeItem = wrapper.find('FlatList').props().renderItem;
      const receiverItemWrapper = shallow(<PayeeItem item={payees[0]} />);

      expect(receiverItemWrapper.props().payee).toEqual(payees[0]);
    });

    it('should call onPress={} when ReceiverItem is clicked', () => {
      const wrapper = shallow(
        <PayeeList payees={payees} onPress={mockedOnPress} />
      );

      const PayeeItem = wrapper.find('FlatList').props().renderItem;
      const receiverItemWrapper = shallow(<PayeeItem item={payees[0]} />);
      receiverItemWrapper.simulate('press', payees[0]);

      expect(mockedOnPress).toHaveBeenCalledWith(payees[0]);
    });
  });
});
