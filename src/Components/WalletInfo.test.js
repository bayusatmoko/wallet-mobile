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
      const idElement = wrapper.find({ testID: 'wallet-id' });
      const nameElement = wrapper.find({ testID: 'wallet-name' });

      expect(textBalance.props().balance).toBe(walletInfo.balance);
      expect(idElement.props().children).toBe(walletInfo.id);
      expect(nameElement.props().children).toBe(walletInfo.name);
    });
  });
});
