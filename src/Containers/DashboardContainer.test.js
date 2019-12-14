import React from 'react';
import { shallow } from 'enzyme';
import getLastTransactionsByWalletId from '../Services/getLastTransactionsByWalletId';
import getUserById from '../Services/getUserById';
import getWalletByUserId from '../Services/getWalletByUserId';
import DashboardContainer from './DashboardContainer';

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

      navigation = {
        navigate: jest.fn(),
        getParam: jest.fn()
      };

      getUserById.mockResolvedValueOnce({ data: userInfo });
      getWalletByUserId.mockResolvedValueOnce({ data: wallet });
      getLastTransactionsByWalletId.mockResolvedValueOnce({
        data: lastTransactions
      });
      navigation.getParam
        .mockResolvedValueOnce(userInfo.id)
        .mockResolvedValueOnce(wallet.id);
      wrapper = shallow(<DashboardContainer navigation={navigation} />);
      await flushPromises();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should call service function getUserById', () => {
      expect(getUserById).toHaveBeenCalledWith(userInfo.id);
    });

    it('should call service function getWalletByUserId', () => {
      expect(getWalletByUserId).toHaveBeenCalledWith(wallet.id);
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

    it('should call navigate with menu path when menu item is pressed', () => {
      wrapper.find('MenuComponent').simulate('press', 'Transfer');

      expect(navigation.navigate).toHaveBeenCalledWith('Transfer');
    });

    it('should fetch from server when refreshed', async () => {
      const refreshControl = wrapper.find('ScrollViewMock').props()
        .refreshControl;

      refreshControl.props.onRefresh();
      await flushPromises();

      expect(getUserById).toHaveBeenCalledTimes(2);
      expect(getWalletByUserId).toHaveBeenCalledTimes(2);
    });
  });
});
