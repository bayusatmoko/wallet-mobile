import React from 'react';
import axios from 'axios';
import { shallow } from 'enzyme';
import { when } from 'jest-when';
import SInfo from 'react-native-sensitive-info';
import TransactionHistoryContainer from './TransactionHistoryContainer';
import getWalletByUserId from '../Services/getWalletByUserId';
import getTransactionsByWalletId from '../Services/getTransactionsByWalletId';

jest.mock('../Services/getWalletByUserId', () => jest.fn());
jest.mock('../Services/getTransactionsByWalletId', () => jest.fn());
jest.mock('axios');
jest.mock('react-native-sensitive-info', () => {
  return { setItem: jest.fn(), getItem: jest.fn() };
});

describe('TransactionHistoryContainer', () => {
  describe('#render', () => {
    let wallet;
    let wrapper;
    let transactions;
    let filterTypeAmount = 'lte';
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
          createdAt: '2019-11-27T13:26:15.063Z',
          updatedAt: '2019-11-28T13:26:15.063Z'
        },
        {
          id: 3,
          walletId: 1,
          type: 'withdraw',
          nominal: 100,
          description: 'Dinner at Italian Steak House',
          receiverWalletId: null,
          createdAt: '2019-11-26T13:26:15.063Z',
          updatedAt: '2019-11-28T13:26:15.063Z'
        },
        {
          id: 4,
          walletId: 1,
          type: 'deposit',
          nominal: 8800000,
          description: 'Payslip 2019-11-29',
          receiverWalletId: null,
          createdAt: '2019-11-25T13:26:15.063Z',
          updatedAt: '2019-11-29T13:26:15.063Z'
        },
        {
          id: 5,
          walletId: 1,
          type: 'withdraw',
          nominal: 40,
          description: 'Buy Big Macs for lunch',
          receiverWalletId: null,
          createdAt: '2019-11-24T13:26:15.063Z',
          updatedAt: '2019-11-29T13:26:15.063Z'
        }
      ];

      getWalletByUserId.mockResolvedValueOnce({ data: wallet });
      getTransactionsByWalletId.mockResolvedValueOnce({ data: transactions });
      when(SInfo.getItem)
        .calledWith('token')
        .mockResolvedValue('token')
        .calledWith('userId')
        .mockResolvedValue('1')
        .calledWith('walletId')
        .mockResolvedValue('1');
      wrapper = shallow(<TransactionHistoryContainer />);
      await flushPromises();
    });

    afterEach(() => {
      jest.resetAllMocks();
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
      await flushPromises();

      expect(wrapper.find('TransactionHistory').props().transactions).toEqual([
        transactions[0]
      ]);
    });

    it('should render transactions filter by nominal', async () => {
      const wrapperTransactionFilter = wrapper.find('TransactionFilter');
      wrapperTransactionFilter.simulate(
        'handleAmount',
        transactions[1].nominal,
        transactions[1].nominal
      );

      expect(wrapper.find('TransactionHistory').props().transactions).toEqual([
        transactions[1]
      ]);
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
      getWalletByUserId.mockResolvedValueOnce({ data: wallet });
      getTransactionsByWalletId.mockResolvedValueOnce({ data: [] });
      wrapper = shallow(<TransactionHistoryContainer />);
      await flushPromises();

      expect(wrapper.find('NoTransactionsFound')).toHaveLength(1);
    });

    it('should render transactions by ascending date when sort is called with setup date and order by ascending', async () => {
      const expectedResult = [
        transactions[4],
        transactions[3],
        transactions[2],
        transactions[1],
        transactions[0]
      ];
      const sortColumn = 'date';
      const orderBy = 'asc';

      wrapper.find('TransactionSort').simulate('sort', sortColumn, orderBy);
      await flushPromises();

      expect(wrapper.find('TransactionHistory').props().transactions).toEqual(
        expectedResult
      );
    });

    it('should render transactions by descending date', async () => {
      const expectedResult = transactions;
      const sortColumn = 'date';
      const orderBy = 'desc';

      wrapper.find('TransactionSort').simulate('sort', sortColumn, orderBy);
      await flushPromises();

      expect(wrapper.find('TransactionHistory').props().transactions).toEqual(
        expectedResult
      );
    });

    it('should render transactions by descending date when sort is called with setup date and order by descending', async () => {
      const expectedResult = transactions;
      const sortColumn = 'date';
      const orderBy = 'desc';

      wrapper.find('TransactionSort').simulate('sort', sortColumn, orderBy);
      await flushPromises();

      expect(wrapper.find('TransactionHistory').props().transactions).toEqual(
        expectedResult
      );
    });

    it('should render transactions by descending nominal when sort is called with setup nominal and order by descending', async () => {
      const expectedResult = [
        transactions[3],
        transactions[0],
        transactions[2],
        transactions[4],
        transactions[1]
      ];
      const sortColumn = 'nominal';
      const orderBy = 'desc';

      wrapper.find('TransactionSort').simulate('sort', sortColumn, orderBy);
      await flushPromises();

      expect(wrapper.find('TransactionHistory').props().transactions).toEqual(
        expectedResult
      );
    });

    it('should render transactions by ascending nominal when sort is called with setup nominal and order by ascending', async () => {
      const expectedResult = [
        transactions[1],
        transactions[4],
        transactions[2],
        transactions[0],
        transactions[3]
      ];
      const sortColumn = 'nominal';
      const orderBy = 'asc';

      wrapper.find('TransactionSort').simulate('sort', sortColumn, orderBy);
      await flushPromises();

      expect(wrapper.find('TransactionHistory').props().transactions).toEqual(
        expectedResult
      );
    });

    it('should render transactions by filter description with keyword "Payslip 2019-11-28"', async () => {
      const expectedResult = [transactions[0]];
      const filterDescription = 'Payslip 2019-11-28';

      wrapper
        .find('TransactionFilter')
        .simulate('handleDescription', filterDescription);
      await flushPromises();

      expect(wrapper.find('TransactionHistory').props().transactions).toEqual(
        expectedResult
      );
    });

    it('should render transactions by filter amount with keyword "7700000" and filter type is greater than or equal', async () => {
      const expectedResult = [transactions[0], transactions[3]];
      const amountMinimum = '7700000';
      const amountMaximum = '770000000';
      wrapper
        .find('TransactionFilter')
        .simulate('handleAmount', amountMinimum, amountMaximum);
      await flushPromises();

      expect(wrapper.find('TransactionHistory').props().transactions).toEqual(
        expectedResult
      );
    });

    it('should render Error when server is down', async () => {
      const errorMessage = 'Network Error';
      getWalletByUserId.mockRejectedValue({ message: errorMessage });
      getTransactionsByWalletId.mockResolvedValueOnce({
        message: errorMessage
      });
      wrapper = shallow(<TransactionHistoryContainer />);
      await flushPromises();

      expect(wrapper.find('Error')).toHaveLength(1);
    });

    it('should render Error when fail fetch transaction from server', async () => {
      const errorMessage = 'Network Error';
      getWalletByUserId.mockResolvedValueOnce({ data: wallet });
      getTransactionsByWalletId.mockRejectedValue({
        response: { data: { message: errorMessage } }
      });
      wrapper = shallow(<TransactionHistoryContainer />);
      await flushPromises();

      expect(wrapper.find('Error')).toHaveLength(1);
    });
  });
});
