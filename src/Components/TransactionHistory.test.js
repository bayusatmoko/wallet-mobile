import React from 'react';
import { shallow } from 'enzyme';
import TransactionHistory from './TransactionHistory';

describe('TransactionHistory', () => {
  describe('#render', () => {
    let transactions;
    let walletId;
    let wrapper;
    beforeEach(() => {
      walletId = 1;
      transactions = [
        {
          id: 1,
          walletId: 1,
          type: 'deposit',
          amount: 7700000,
          description: 'Payslip 2019-11-28',
          receiverWalletId: null,
          createdAt: '2019-11-28T13:26:15.063Z',
          updatedAt: '2019-11-28T13:26:15.063Z'
        },
        {
          id: 2,
          walletId: 1,
          type: 'withdraw',
          amount: 30,
          description: 'Buy Cheeseburger for lunch',
          receiverWalletId: null,
          createdAt: '2019-11-28T13:26:15.063Z',
          updatedAt: '2019-11-28T13:26:15.063Z'
        },
        {
          id: 3,
          walletId: 1,
          type: 'withdraw',
          amount: 100,
          description: 'Dinner at Italian Steak House',
          receiverWalletId: null,
          createdAt: '2019-11-28T13:26:15.063Z',
          updatedAt: '2019-11-28T13:26:15.063Z'
        },
        {
          id: 4,
          walletId: 1,
          type: 'deposit',
          amount: 8800000,
          description: 'Payslip 2019-11-29',
          receiverWalletId: null,
          createdAt: '2019-11-29T13:26:15.063Z',
          updatedAt: '2019-11-29T13:26:15.063Z'
        },
        {
          id: 5,
          walletId: 1,
          type: 'withdraw',
          amount: 40,
          description: 'Buy Big Macs for lunch',
          receiverWalletId: null,
          createdAt: '2019-11-29T13:26:15.063Z',
          updatedAt: '2019-11-29T13:26:15.063Z'
        },
        {
          id: 6,
          walletId: 1,
          type: 'withdraw',
          amount: 40,
          description: 'Buy Big Macs for lunch',
          receiverWalletId: null,
          createdAt: '2019-11-29T13:26:15.063Z',
          updatedAt: '2019-11-29T13:26:15.063Z'
        }
      ];
      wrapper = shallow(
        <TransactionHistory transactions={transactions} walletId={walletId} />
      );
    });
    it('should render FlatList with props transactions with length is 6', () => {
      expect(wrapper.find('FlatList').length).toBe(1);
      expect(wrapper.find('FlatList').props().data.length).toBe(6);
    });

    it('should transaction and wallet in transaction history page', async () => {
      await flushPromises();
      const RenderItem = wrapper.find('FlatList').props().renderItem;
      const KeyExtractor = wrapper
        .find('FlatList')
        .props()
        .keyExtractor(transactions[0]);
      const renderItemWrapper = shallow(
        <RenderItem item={transactions[0]} walletId={walletId} />
      );

      expect(renderItemWrapper.props().transaction).toBe(transactions[0]);
      expect(renderItemWrapper.find('TransactionDetail').props().walletId).toBe(
        walletId
      );
      expect(KeyExtractor).toBe(`${transactions[0].id}`);
    });
  });
});
