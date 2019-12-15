import React from 'react';
import axios from 'axios';
import { shallow } from 'enzyme';
import DashboardContainer from './DashboardContainer';

jest.mock('axios');
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
        navigate: jest.fn()
      };
      axios.get
        .mockResolvedValueOnce({ data: userInfo })
        .mockResolvedValueOnce({ data: wallet })
        .mockResolvedValue({ data: lastTransactions });

      wrapper = shallow(<DashboardContainer navigation={navigation} />);
      await flushPromises();
    });

    afterEach(() => {
      jest.clearAllMocks();
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
  });
});
