import React from 'react';
import { shallow } from 'enzyme';
import { when } from 'jest-when';
import SInfo from 'react-native-sensitive-info';
import SpendingChart from '../Components/SpendingChart';
import getTransactionsByWalletId from '../Services/getTransactionsByWalletId';
import SpendingAnalysisContainer from './SpendingAnalysisContainer';

jest.mock('react-native-sensitive-info', () => {
  return { setItem: jest.fn(), getItem: jest.fn(), deleteItem: jest.fn() };
});
jest.mock('../Services/getTransactionsByWalletId', () => jest.fn());

describe('SpendingAnalysisContainer', () => {
  let wrapper;
  let transactions;
  beforeEach(async () => {
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
      }
    ];
    getTransactionsByWalletId.mockResolvedValueOnce({ data: transactions });
    when(SInfo.getItem)
      .calledWith('token')
      .mockResolvedValue('token')
      .calledWith('walletId')
      .mockResolvedValue('1');
    wrapper = shallow(<SpendingAnalysisContainer />);
    await flushPromises();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('#render', () => {
    it('should fetch transactions from server', () => {
      expect(wrapper.find('SpendingChart').props().transactions).toEqual(
        transactions
      );
    });

    it('should display error when server down', async () => {
      getTransactionsByWalletId.mockRejectedValue(Error('Network error'));
      wrapper = shallow(<SpendingAnalysisContainer />);
      await flushPromises();

      expect(wrapper.find('Error')).toHaveLength(1);
    });

    it('should display error when failed to fetch transactions', async () => {
      getTransactionsByWalletId.mockRejectedValue({
        response: { data: { message: 'Failed to fetch' } }
      });
      wrapper = shallow(<SpendingAnalysisContainer />);
      await flushPromises();

      expect(wrapper.find('Error')).toHaveLength(1);
    });

    it('should display min date to two weeks ago when selected "Last two weeks" option', async () => {
      wrapper
        .find('RNPickerSelect')
        .simulate('valueChange', SpendingChart.DATE_RANGE.TWO_WEEK);

      await flushPromises();

      expect(wrapper.find('SpendingChart').props().minDate).not.toEqual(
        SpendingChart.DATE_RANGE.ONE_WEEK
      );
    });
  });
});
