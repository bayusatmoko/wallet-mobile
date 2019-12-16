import React from 'react';
import axios from 'axios';
import { shallow } from 'enzyme';
import TransactionHistoryContainer from './TransactionHistoryContainer';

jest.mock('axios');
describe('TransactionHistoryContainer', () => {
  describe('#render', () => {
    let wallet;
    let wrapper;
    let transactions;
    beforeEach(async () => {
      wallet = {
        id: 1,
        userId: 1,
        balance: 'IDR500,000'
      };

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

      axios.get
        .mockResolvedValueOnce({ data: wallet })
        .mockResolvedValue({ data: transactions });
      wrapper = shallow(<TransactionHistoryContainer />);
      await flushPromises();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should render transactions', () => {
      expect(wrapper.find('TransactionHistory').length).toBe(1);
    });

    it('should render error network when the wallet backend is down', async () => {
      axios.get.mockRejectedValue(Error('Network error'));
      wrapper = shallow(<TransactionHistoryContainer />);
      await flushPromises();

      expect(wrapper.find('Error')).toHaveLength(1);
    });

    it('should render error network when the transactions backend is down', async () => {
      axios.get.mockResolvedValueOnce({ data: wallet });
      const errorMessage = 'Network Error';
      axios.get.mockRejectedValue({
        response: { data: { message: errorMessage } }
      });
      wrapper = shallow(<TransactionHistoryContainer />);
      await flushPromises();

      expect(wrapper.find('Error')).toHaveLength(1);
    });

    it('should render no transaction found when user has no transaction', async () => {
      axios.get
        .mockResolvedValueOnce({ data: wallet })
        .mockResolvedValueOnce({ data: [] });
      wrapper = shallow(<TransactionHistoryContainer />);
      await flushPromises();

      expect(wrapper.find('NoTransactionsFound')).toHaveLength(1);
    });
  });
});
