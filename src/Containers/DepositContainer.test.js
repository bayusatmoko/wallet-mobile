import { shallow } from 'enzyme';
import React from 'react';
import axios from 'axios';
import DepositContainer from './DepositContainer';

jest.mock('axios');

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
    navigation = {
      getParam: jest.fn().mockReturnValue(onRefresh),
      goBack: jest.fn()
    };
    axios.post.mockResolvedValue({ data: transaction });
    axios.get.mockResolvedValue({ data: wallet });
    wrapper = shallow(<DepositContainer navigation={navigation} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should call POST with transaction data when button submit is clicked', async () => {
      wrapper.find('TransactionForm').simulate('submit', transaction);
      await flushPromises();

      expect(axios.post).toHaveBeenCalledWith(
        `${API_URL}/transactions`,
        transaction
      );
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
  });
});
