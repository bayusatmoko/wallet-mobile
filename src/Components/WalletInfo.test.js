import React from 'react';
import { shallow } from 'enzyme';
import WalletInfo from './WalletInfo';

describe('WalletInfo', () => {
  describe('#render', () => {
    let walletInfo;
    let wrapper;
    beforeEach(() => {
      walletInfo = {
        id: 1,
        name: 'Huda',
        balance: 'IDR500,000'
      };
      wrapper = shallow(<WalletInfo wallet={walletInfo} />);
    });
    it('should render balance info', () => {
      const textBalance = wrapper.find('Balance');

      expect(textBalance.props().balance).toBe(walletInfo.balance);
    });
  });
});
