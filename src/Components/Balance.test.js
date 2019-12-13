import React from 'react';
import { shallow } from 'enzyme';
import Balance from './Balance';

describe('Balance', () => {
  describe('#render', () => {
    it('should render balance info', () => {
      const balance = 500000;
      const wrapper = shallow(<Balance balance={balance} />);
      const expectedResult = 'IDR500,000';

      const textBalance = wrapper.find({ testID: 'balance' });

      expect(textBalance.props().children).toBe(expectedResult);
    });
  });
});
