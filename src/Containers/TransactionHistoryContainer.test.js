import React from 'react';
import { shallow } from 'enzyme';
import TransactionHistoryContainer from './TransactionHistoryContainer';
import getWalletByUserId from '../Services/getWalletByUserId';
import getTransactionsByWalletId from '../Services/getTransactionsByWalletId';
import axios from 'axios';

jest.mock('../Services/getWalletByUserId', () => jest.fn());
jest.mock('../Services/getTransactionsByWalletId', () => jest.fn());
// jest.mock('axios');

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
          nominal: 7700000,
          description: 'Payslip 2019-11-28',
          receiverWalletId: null,
          createdAt: '2019-11-28T13:26:15.063Z',
          updatedAt: '2019-11-28T13:26:15.063Z'
        },
        {
          id: 2,
          walletId: 1,
          type: 'withdraw',
          nominal: 30,
          description: 'Buy Cheeseburger for lunch',
          receiverWalletId: null,
          createdAt: '2019-11-28T13:26:15.063Z',
          updatedAt: '2019-11-28T13:26:15.063Z'
        },
        {
          id: 3,
          walletId: 1,
          type: 'withdraw',
          nominal: 100,
          description: 'Dinner at Italian Steak House',
          receiverWalletId: null,
          createdAt: '2019-11-28T13:26:15.063Z',
          updatedAt: '2019-11-28T13:26:15.063Z'
        },
        {
          id: 4,
          walletId: 1,
          type: 'deposit',
          nominal: 8800000,
          description: 'Payslip 2019-11-29',
          receiverWalletId: null,
          createdAt: '2019-11-29T13:26:15.063Z',
          updatedAt: '2019-11-29T13:26:15.063Z'
        },
        {
          id: 5,
          walletId: 1,
          type: 'withdraw',
          nominal: 40,
          description: 'Buy Big Macs for lunch',
          receiverWalletId: null,
          createdAt: '2019-11-29T13:26:15.063Z',
          updatedAt: '2019-11-29T13:26:15.063Z'
        }
      ];

      getWalletByUserId.mockResolvedValueOnce({ data: wallet });
      getTransactionsByWalletId.mockResolvedValueOnce({ data: transactions });

      wrapper = shallow(<TransactionHistoryContainer />);
      await flushPromises();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should render transactions', () => {
      expect(wrapper.find('TransactionHistory').length).toBe(1);
    });

    it('should render transactions filter by description', async () => {
      const wrapperTransactionFilter = wrapper.find('TransactionFilter');
      wrapperTransactionFilter.simulate(
        'handleDescription',
        transactions[0].description
      );

      expect(wrapper.find('TransactionHistory').props().transactions).toEqual([
        transactions[0]
      ]);
    });

    it('should render transactions filter by nominal', async () => {
      const wrapperTransactionFilter = wrapper.find('TransactionFilter');
      wrapperTransactionFilter.simulate(
        'handleAmount',
        transactions[0].nominal
      );

      expect(wrapper.find('TransactionHistory').props().transactions).toEqual([
        transactions[0]
      ]);
    });
  });
});
