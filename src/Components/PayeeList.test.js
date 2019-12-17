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
        <PayeeList payees={payees} onPressPayee={mockedOnPress} />
      );

      const PayeeItem = wrapper.find('FlatList').props().renderItem;
      const receiverItemWrapper = shallow(<PayeeItem item={payees[0]} />);

      expect(receiverItemWrapper.props().payee).toEqual(payees[0]);
    });

    it('should render the list with the key', () => {
      const wrapper = shallow(
        <PayeeList payees={payees} onPressPayee={mockedOnPress} />
      );
      const keyExtractor = wrapper
        .find('FlatList')
        .props()
        .keyExtractor(payees[0]);

      expect(keyExtractor).toBe(payees[0].id.toString());
    });

    it('should call onPress={} when ReceiverItem is clicked', () => {
      const wrapper = shallow(
        <PayeeList payees={payees} onPressPayee={mockedOnPress} />
      );

      const PayeeItem = wrapper.find('FlatList').props().renderItem;
      const receiverItemWrapper = shallow(
        <PayeeItem item={payees[0]} onPressPayee={mockedOnPress} />
      );
      receiverItemWrapper.simulate('pressPayee', payees[0]);

      expect(mockedOnPress).toHaveBeenCalledWith(payees[0]);
    });
  });
});
