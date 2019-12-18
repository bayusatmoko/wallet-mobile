import { shallow } from 'enzyme';
import React from 'react';
import axios from 'axios';
import SInfo from 'react-native-sensitive-info';
import { when } from 'jest-when';
import DepositContainer from './DepositContainer';

jest.mock('axios');
jest.mock('react-native-sensitive-info', () => {
  return { setItem: jest.fn(), getItem: jest.fn() };
});

describe('DepositContainer', () => {
  let wrapper;
  const wallet = {
    userId: 1,
    balance: 2500
  };
  const transaction = {
    walletId: 1,
    receiverWalletId: 1,
    type: 'DEPOSIT',
    nominal: 1250,
    description: 'Payslip 2019-11-28'
  };
  let navigation;
  const onRefresh = jest.fn();

  const API_URL = 'http://localhost:3000';

  beforeEach(() => {
    jest.useFakeTimers();
    navigation = {
      getParam: jest.fn().mockReturnValue(onRefresh),
      goBack: jest.fn()
    };
    axios.post.mockResolvedValue({ data: transaction });
    axios.get.mockResolvedValue({ data: wallet });
    when(SInfo.getItem)
      .calledWith('token')
      .mockResolvedValue('token')
      .calledWith('userId')
      .mockResolvedValue('1')
      .calledWith('walletId')
      .mockResolvedValue('1');
    wrapper = shallow(<DepositContainer navigation={navigation} />);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should call POST with transaction data when button submit is clicked', async () => {
      wrapper.find('TransactionForm').simulate('submit', transaction);
      await flushPromises();

      expect(axios.post).toHaveBeenCalledTimes(1);
    });

    it('should call onRefresh when button submit is clicked', async () => {
      wrapper.find('TransactionForm').simulate('submit', transaction);
      await flushPromises();

      expect(onRefresh).toHaveBeenCalled();
    });

    it('should not render any notification when not submitted yet', () => {
      expect(wrapper.find('FailedNotification').length).toBe(0);
      expect(wrapper.find('SuccessNotification').length).toBe(0);
    });

    it('should not render success notification but render failed notification when failed to deposit', async () => {
      axios.post.mockRejectedValue({
        response: { data: { message: 'Network Error' } }
      });
      wrapper = shallow(<DepositContainer />);

      wrapper.find('TransactionForm').simulate('submit', transaction);
      await flushPromises();

      expect(wrapper.find('SuccessNotification').length).toBe(0);
      expect(wrapper.find('FailedNotification').length).toBe(1);
    });

    it('should show loading indicator when submit the deposit', async () => {
      wrapper.find('TransactionForm').simulate('submit', transaction);
      await flushPromises();

      expect(wrapper.find('ActivityIndicator')).toHaveLength(1);
    });

    it('should hide loading indicator when done deposit', async () => {
      wrapper.find('TransactionForm').simulate('submit', transaction);
      await flushPromises();
      jest.runAllTimers();

      expect(wrapper.find('ActivityIndicator')).toHaveLength(0);
    });

    it('should render FailedNotification when server is not running', async () => {
      axios.post.mockRejectedValue({ message: 'Network Error' });
      wrapper = shallow(<DepositContainer />);

      wrapper.find('TransactionForm').simulate('submit', transaction);
      await flushPromises();

      expect(wrapper.find('FailedNotification').length).toBe(1);
    });
  });
});
