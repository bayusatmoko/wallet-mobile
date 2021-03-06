import { shallow } from 'enzyme';
import { matchers } from 'jest-emotion';
import moment from 'moment';
import React from 'react';
import TransactionDetail from './TransactionDetail';

expect.extend(matchers);

describe('TransactionDetail', () => {
  let wrapper;
  let transaction;
  let transferTransaction;
  beforeEach(() => {
    transaction = {
      id: 1,
      walletId: 1,
      receiverWalletId: 1,
      type: 'DEPOSIT',
      nominal: 11111,
      description: 'Uang suap',
      createdAt: '2019-12-13T09:10:31.186Z',
      updatedAt: '2019-12-13T09:10:31.186Z',
      receiver: {
        id: 1,
        user: {
          name: 'Fadel'
        }
      },
      sender: {
        id: 1,
        user: {
          name: 'Fadel'
        }
      }
    };
    transferTransaction = {
      id: 2,
      walletId: 1,
      receiverWalletId: 2,
      type: 'TRANSFER',
      nominal: 22222,
      description: 'Money laundering to farah',
      createdAt: '2019-12-13T09:10:31.186Z',
      updatedAt: '2019-12-13T09:10:31.186Z',
      receiver: {
        id: 2,
        user: {
          name: 'Farah'
        }
      },
      sender: {
        id: 1,
        user: {
          name: 'Fadel'
        }
      }
    };
    wrapper = shallow(
      <TransactionDetail
        transaction={transaction}
        walletId={transaction.walletId}
      />
    );
  });
  describe('#render', () => {
    it('should render description, amount, transaction type, date and receiver', () => {
      const expectedAmount = 'IDR11,111';
      const expectedText = '';
      const expectedDate = moment(transaction.createdAt).format('DD MMM YYYY');

      const wrapperTransaction = shallow(
        <TransactionDetail transaction={transaction} />
      );
      const description = wrapperTransaction.find({ testID: 'description' });
      const nominal = wrapperTransaction.find({ testID: 'nominal' });
      const type = wrapperTransaction.find({ testID: 'type' });
      const date = wrapperTransaction.find({ testID: 'date' });
      const receiver = wrapperTransaction.find({ testID: 'receiver' });

      expect(description.props().children).toBe(transaction.description);
      expect(type.props().children).toBe(transaction.type);
      expect(nominal.props().children).toBe(expectedAmount);
      expect(date.props().children).toBe(expectedDate);
      expect(receiver.props().children).toBe(expectedText);
    });

    it('should text color of amount is green when the type is DEPOSIT', () => {
      const expectedStyle = [
        { fontSize: 16, fontWeight: 'bold' },
        { color: 'green', marginRight: '2%' }
      ];
      expect(wrapper.find({ testID: 'nominal' }).props().style).toMatchObject(
        expectedStyle
      );
      expect(wrapper.find({ testID: 'receiver' }).props().children).toEqual('');
    });

    it('should text color of amount is red when the type is TRANSFER to another account', () => {
      wrapper = shallow(
        <TransactionDetail
          transaction={transferTransaction}
          walletId={transferTransaction.walletId}
        />
      );
      const expectedText = `To ${transferTransaction.receiver.user.name}`;

      const expectedStyle = [
        { fontSize: 16, fontWeight: 'bold' },
        { color: 'red', marginRight: '2%' }
      ];
      expect(wrapper.find({ testID: 'nominal' }).props().style).toMatchObject(
        expectedStyle
      );
      expect(wrapper.find({ testID: 'receiver' }).props().children).toEqual(
        expectedText
      );
    });

    it('should text color of amount is green when the type is TRANSFER from another account', () => {
      wrapper = shallow(
        <TransactionDetail
          transaction={transferTransaction}
          walletId={transferTransaction.receiverWalletId}
        />
      );
      const expectedText = `From ${transferTransaction.sender.user.name}`;

      const expectedStyle = [
        { fontSize: 16, fontWeight: 'bold' },
        { color: 'green', marginRight: '2%' }
      ];
      expect(wrapper.find({ testID: 'nominal' }).props().style).toMatchObject(
        expectedStyle
      );
      expect(wrapper.find({ testID: 'receiver' }).props().children).toEqual(
        expectedText
      );
    });
  });
});
