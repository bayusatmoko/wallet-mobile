import React from 'react';
import { shallow } from 'enzyme';
import LastTransaction from './LastTransaction';

describe('LastTransaction', () => {
  describe('#render', () => {
    let transactions;
    let wrapper;
    const walletId = 1;
    const mockedOnRefresh = jest.fn();
    beforeEach(() => {
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
        }
      ];
      wrapper = shallow(
        <LastTransaction
          transactions={transactions}
          walletId={walletId}
          isRefreshing={false}
          onRefresh={mockedOnRefresh}
        />
      );
    });

    it('should render FlatList with props transactions with length is 5', () => {
      expect(wrapper.find('FlatList').length).toBe(1);
      expect(wrapper.find('FlatList').props().data.length).toBe(5);
    });

    it('should call onRefresh when flatlist is refreshed', () => {
      const refreshControlWrapper = wrapper.find('FlatList').props()
        .refreshControl;

      refreshControlWrapper.props.onRefresh();

      expect(mockedOnRefresh).toHaveBeenCalled();
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
      expect(renderItemWrapper.find('TransactionItem').props().walletId).toBe(
        walletId
      );
      expect(KeyExtractor).toBe(`${transactions[0].id}`);
    });
  });
});
