import { shallow } from 'enzyme';
import React from 'react';
import axios from 'axios';
import { when } from 'jest-when';
import TransferContainer from './TransferContainer';

jest.mock('axios');

describe('TransferContainer', () => {
  let wrapper;
  const users = [
    {
      id: 1,
      name: 'Fadele',
      email: 'fadele@btpn.com',
      wallet: {
        id: 1,
        balance: 500
      }
    },
    {
      id: 2,
      name: 'Huda',
      email: 'hudah@btpn.com',
      wallet: {
        id: 2,
        balance: 1000
      }
    }
  ];
  const transaction = {
    walletId: 1,
    receiverWalletId: 2,
    type: 'TRANSFER',
    nominal: 1250,
    description: 'Payslip 2019-11-28'
  };
  const API_URL = 'http://localhost:3000';
  let navigation;
  const onRefresh = jest.fn();

  beforeEach(() => {
    navigation = {
      getParam: jest.fn().mockReturnValue(onRefresh),
      goBack: jest.fn()
    };
    when(axios.get)
      .calledWith('http://localhost:3000/users?email=hudah@btpn.com')
      .mockResolvedValue({ data: users[1] })
      .calledWith('http://localhost:3000/users/1/wallets')
      .mockResolvedValue({ data: users[0].wallet });
    axios.post.mockResolvedValue({ data: transaction });
    wrapper = shallow(
      <TransferContainer API_URL={API_URL} navigation={navigation} />
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should display receiver name and email based on email in ReceiverSearch', async () => {
      wrapper.find('ReceiverSearch').simulate('submit', 'hudah@btpn.com');
      await flushPromises();

      expect(wrapper.find('TransactionForm').props().title).toContain(
        users[1].name
      );
      expect(wrapper.find('TransactionForm').props().title).toContain(
        users[1].email
      );
    });

    it('should call POST with transaction data when button submit is clicked', async () => {
      wrapper.find('ReceiverSearch').simulate('submit', 'hudah@btpn.com');
      await flushPromises();
      wrapper.find('TransactionForm').simulate('submit', transaction);
      await flushPromises();

      expect(axios.post).toHaveBeenCalledWith(
        `${API_URL}/transactions`,
        transaction
      );
    });

    it('should call onRefresh when button submit is clicked', async () => {
      wrapper.find('ReceiverSearch').simulate('submit', 'hudah@btpn.com');
      await flushPromises();
      wrapper.find('TransactionForm').simulate('submit', transaction);
      await flushPromises();

      expect(onRefresh).toHaveBeenCalled();
    });

    it('should not render any notification when not submitted yet', () => {
      expect(wrapper.find('FailedNotification').length).toBe(0);
      expect(wrapper.find('SuccessNotification').length).toBe(0);
    });

    it('should not render success notification but render failed notification when failed to transfer', async () => {
      axios.post.mockRejectedValue({
        response: { data: { message: 'Network Error!' } }
      });
      wrapper = shallow(<TransferContainer API_URL={API_URL} />);

      wrapper.find('ReceiverSearch').simulate('submit', users[1].email);
      await flushPromises();
      wrapper.find('TransactionForm').simulate('submit', transaction);
      await flushPromises();

      expect(wrapper.find('SuccessNotification').length).toBe(0);
      expect(wrapper.find('FailedNotification').length).toBe(1);
    });

    it('should render success notification when the transaction is successful', async () => {
      wrapper.find('ReceiverSearch').simulate('submit', 'hudah@btpn.com');
      await flushPromises();
      wrapper.find('TransactionForm').simulate('submit', transaction);
      await flushPromises();

      expect(wrapper.find('SuccessNotification').length).toBe(1);
      expect(wrapper.find('FailedNotification').length).toBe(0);
    });

    it('should render success notification with the balance when the transaction is successful', async () => {
      wrapper.find('ReceiverSearch').simulate('submit', 'hudah@btpn.com');
      await flushPromises();
      wrapper.find('TransactionForm').simulate('submit', transaction);
      await flushPromises();

      expect(wrapper.find('SuccessNotification').props().balance).toBe(
        users[0].wallet.balance
      );
    });

    it('should render walletError when receiver is not found', async () => {
      when(axios.get)
        .calledWith('http://localhost:3000/users?email=fadele@btpn.com')
        .mockRejectedValue({
          response: { data: { message: 'Receiver not found!' } }
        });
      wrapper = shallow(<TransferContainer API_URL={API_URL} />);

      wrapper.find('ReceiverSearch').simulate('submit', 'fadele@btpn.com');
      await flushPromises();

      expect(wrapper.find('ReceiverList').length).toBe(0);
      expect(wrapper.find('FailedNotification').length).toBe(1);
      expect(wrapper.find('TransactionForm').length).toBe(0);
    });

    it('should not render receiver search when already searched', async () => {
      wrapper.find('ReceiverSearch').simulate('submit', users[1].email);
      await flushPromises();

      expect(wrapper.find('ReceiverSearch')).toHaveLength(0);
      expect(wrapper.find('TransactionForm')).toHaveLength(1);
    });

    it('should render Receiver Search and success notification when done transfer', async () => {
      wrapper.find('ReceiverSearch').simulate('submit', 'hudah@btpn.com');
      await flushPromises();
      wrapper.find('TransactionForm').simulate('submit', transaction);
      await flushPromises();

      expect(wrapper.find('ReceiverSearch')).toHaveLength(1);
      expect(wrapper.find('SuccessNotification')).toHaveLength(1);
    });
  });
});
