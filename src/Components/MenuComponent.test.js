import React from 'react';
import { shallow } from 'enzyme';
import MenuComponent from './MenuComponent';

describe('MenuComponent', () => {
  let wrapper;
  let mockedOnPress = jest.fn();
  let navigation;
  beforeEach(() => {
    navigation = {
      navigate: jest.fn()
    };

    wrapper = shallow(<MenuComponent navigation={navigation} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should called onPress with "TransferHistory" when menu-transaction-history is pressed', () => {
      const menuTransfer = wrapper.find({ testID: 'menu-transaction-history' });

      menuTransfer.simulate('press');

      expect(navigation.navigate).toHaveBeenCalledWith('TransactionHistory');
    });
  });
});
