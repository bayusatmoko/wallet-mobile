import React from 'react';
import { shallow } from 'enzyme';
import TransactionItem from './TransactionItem';
import moment from 'moment';

describe('TransactionItem', () => {
  describe('#render', () => {
    it('should render description, amount, transaction type, date and receiver', () => {
      const transaction = {
        id: 17,
        walletId: 1,
        receiverWalletId: 1,
        type: 'DEPOSIT',
        nominal: 1000,
        description: 'Uang suap',
        createdAt: '2019-12-13T03:53:50.514Z',
        updatedAt: '2019-12-13T03:53:50.514Z',
        receiver: {
          id: 1,
          user: {
            name: 'Fadel'
          }
        }
      };
      const expectedAmount = 'IDR1,000';
      const expectedDate = moment(transaction.createdAt).format('D-MM-YYYY');

      const wrapper = shallow(<TransactionItem transaction={transaction} />);
      const description = wrapper.find({ testID: 'description' });
      const nominal = wrapper.find({ testID: 'nominal' });
      const type = wrapper.find({ testID: 'type' });
      const date = wrapper.find({ testID: 'date' });
      const receiver = wrapper.find({ testID: 'receiver' });

      expect(description.props().children).toBe(transaction.description);
      expect(type.props().children).toBe(transaction.type);
      expect(nominal.props().children).toBe(expectedAmount);
      expect(date.props().children).toBe(expectedDate);
      expect(receiver.props().children).toBe(transaction.receiver.user.name);
    });
  });
});
