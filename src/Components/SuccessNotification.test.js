import React from 'react';
import { shallow } from 'enzyme';
import SuccessNotification from './SuccessNotification';

describe('SuccessNotification', () => {
  describe('#render', () => {
    let wrapper;
    const balance = 12500;
    beforeEach(() => {
      wrapper = shallow(<SuccessNotification balance={balance} />);
    });
    it('should render balance component with the correct props', () => {
      expect(wrapper.find('Balance').props().balance).toBe(balance);
    });
  });
});
