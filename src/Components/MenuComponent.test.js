import React from 'react';
import { shallow } from 'enzyme';
import NAVIGATION from '../Constants/navigation';
import MenuComponent from './MenuComponent';

describe('MenuComponent', () => {
  let wrapper;
  let mockedOnPress = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<MenuComponent onPress={mockedOnPress} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should called onPress with "Transfer" when menu-transfer is pressed', () => {
      const menuTransfer = wrapper.find({ testID: 'menu-transfer' });

      menuTransfer.simulate('press');

      expect(mockedOnPress).toHaveBeenCalledWith(NAVIGATION.TRANSFER);
    });

    it('should called onPress with "Deposit" when menu-deposit is pressed', () => {
      const menuTransfer = wrapper.find({ testID: 'menu-deposit' });

      menuTransfer.simulate('press');

      expect(mockedOnPress).toHaveBeenCalledWith(NAVIGATION.DEPOSIT);
      expect(mockedOnPress).not.toHaveBeenCalledWith(NAVIGATION.TRANSFER);
    });
  });
});
