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
    beforeEach(async () => {
      userInfo = {
        id: 1,
        name: 'Huda',
        phoneNumber: '08237283',
        email: 'huda@gmail.com'
      };

      wallet = {
        id: 1,
        userId: userInfo.id,
        balance: 'IDR500,000'
      };

      walletDetail = {
        id: wallet.id,
        name: userInfo.name,
        balance: wallet.balance
      };

      const navigation = {
        getParam: jest.fn()
      };
      axios.get
        .mockResolvedValueOnce({ data: userInfo })
        .mockResolvedValueOnce({ data: wallet });
      navigation.getParam
        .mockResolvedValueOnce(userInfo.id)
        .mockResolvedValueOnce(wallet.id);
      wrapper = shallow(<DashboardContainer navigation={navigation} />);
      await flushPromises();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should render balance info', () => {
      const walletInfo = wrapper.find('WalletInfo');

      expect(walletInfo.props().wallet).toEqual(walletDetail);
    });
  });
});
