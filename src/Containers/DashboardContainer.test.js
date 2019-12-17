import React from 'react';
import { shallow } from 'enzyme';
import { when } from 'jest-when';
import SInfo from 'react-native-sensitive-info';
import getUserById from '../Services/getUserById';
import getWalletByUserId from '../Services/getWalletByUserId';
import getLastTransactionsByWalletId from '../Services/getLastTransactionsByWalletId';
import DashboardContainer from './DashboardContainer';
import axios from 'axios';

jest.mock('react-native-sensitive-info', () => {
  return { setItem: jest.fn(), getItem: jest.fn() };
});

jest.mock('../Services/getUserById', () => jest.fn());
jest.mock('../Services/getWalletByUserId', () => jest.fn());
jest.mock('../Services/getLastTransactionsByWalletId', () => jest.fn());
jest.mock('axios');

jest.mock('../Services/getUserById', () => jest.fn());
jest.mock('../Services/getWalletByUserId', () => jest.fn());
jest.mock('../Services/getLastTransactionsByWalletId', () => jest.fn());

describe('DashboardContainer', () => {
  describe('#render', () => {
    let wallet;
    let userInfo;
    let walletDetail;
    let wrapper;
    let lastTransactions;
    let navigation;
    let decodedResponse;
    beforeEach(async () => {
      userInfo = {
        id: 1,
        name: 'Huda',
        phoneNumber: '08237283',
        email: 'huda@gmail.com'
      };

      wallet = {
        id: 1,
        name: userInfo.name,
        balance: 'IDR500,000'
      };

      walletDetail = {
        id: wallet.id,
        name: userInfo.name,
        balance: wallet.balance
      };

      lastTransactions = [
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

      decodedResponse = {
        user: {
          id: 1,
          name: 'Fadel Chaidar Fachru',
          email: 'fadelchaidarf@gmail.com',
          phoneNumber: '083812345678',
          createdAt: '2019-12-17T10:09:07.077Z',
          updatedAt: '2019-12-17T10:09:07.077Z',
          wallet: {
            id: 1,
            balance: 25657500
          }
        },
        iat: 1576579241,
        exp: 1576665641
      };

      navigation = {
        navigate: jest.fn(),
        getParam: jest.fn()
      };

      getUserById.mockResolvedValue({ data: userInfo });
      getWalletByUserId.mockResolvedValue({ data: wallet });
      getLastTransactionsByWalletId.mockResolvedValue({
        data: lastTransactions
      });
      navigation.getParam
        .mockResolvedValueOnce(userInfo.id)
        .mockResolvedValueOnce(wallet.id);

      getUserById.mockResolvedValue({ data: userInfo });
      getWalletByUserId.mockResolvedValue({ data: wallet });
      getLastTransactionsByWalletId.mockResolvedValue({
        data: lastTransactions
      });
      navigation.getParam
        .mockResolvedValueOnce(userInfo.id)
        .mockResolvedValueOnce(wallet.id);
      axios.get
        .mockResolvedValueOnce({ data: userInfo })
        .mockResolvedValueOnce({ data: wallet })
        .mockResolvedValue({ data: lastTransactions });
      when(SInfo.getItem)
        .calledWith('token')
        .mockResolvedValue('token')
        .calledWith('userId')
        .mockResolvedValue('1')
        .calledWith('walletId')
        .mockResolvedValue('1');
      wrapper = shallow(<DashboardContainer navigation={navigation} />);
      await flushPromises();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call service function getUserById', () => {
      expect(getUserById).toHaveBeenCalledWith('1', 'token');
    });

    it('should call service function getWalletByUserId', () => {
      expect(getWalletByUserId).toHaveBeenCalledWith('1', 'token');
    });

    it('should render user and wallet info', () => {
      const userInfoElement = wrapper.find('UserInfo');
      const walletInfoElement = wrapper.find('WalletInfo');

      expect(userInfoElement.props().user).toEqual(userInfo);
      expect(walletInfoElement.props().wallet).toEqual(walletDetail);
    });

    it('should render LastTransaction', () => {
      expect(wrapper.find('LastTransaction').length).toBe(1);
    });

    it('should render LastTransaction with transctions data from server', () => {
      expect(wrapper.find('LastTransaction').props().transactions).toEqual(
        lastTransactions
      );
    });

    it('should fetch from server when refreshed', async () => {
      wrapper.find('LastTransaction').simulate('refresh');

      await flushPromises();

      expect(getUserById).toHaveBeenCalledTimes(2);
      expect(getWalletByUserId).toHaveBeenCalledTimes(2);
      expect(getLastTransactionsByWalletId).toHaveBeenCalledTimes(2);
    });

    it('should call navigate with menu path when menu item is pressed', () => {
      wrapper.find('MenuComponent').simulate('press', 'Transfer');

      expect(navigation.navigate).toHaveBeenCalledWith('Transfer', {
        onRefresh: expect.any(Function)
      });
    });

    it('should render failed notification when failed to fetch from server', async () => {
      getUserById.mockRejectedValueOnce({
        response: { data: { message: 'Network Error' } }
      });
      getWalletByUserId.mockRejectedValueOnce({
        response: { data: { message: 'Network Error' } }
      });
      getLastTransactionsByWalletId.mockRejectedValueOnce(
        Error('Network Error')
      );

      wrapper = shallow(<DashboardContainer navigation={navigation} />);
      await flushPromises();

      expect(wrapper.find('Error').length).toBe(1);
    });

    it('should render FailedNotification when server is not running', async () => {
      getUserById.mockRejectedValueOnce({ message: 'Network Error' });
      getWalletByUserId.mockRejectedValueOnce({ message: 'Network Error' });
      getLastTransactionsByWalletId.mockRejectedValueOnce({
        message: 'Network Error'
      });
      wrapper = shallow(<DashboardContainer navigation={navigation} />);
      await flushPromises();

      expect(wrapper.find('Error').length).toBe(1);
    });
  });
});
