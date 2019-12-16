import React from 'react';
import { shallow } from 'enzyme';
import FailedNotification from './FailedNotification';

describe('FailedNotification', () => {
  describe('#render', () => {
    let wrapper;
    const errorMessage = 'Network Error';
    beforeEach(() => {
      wrapper = shallow(<FailedNotification message={errorMessage} />);
    });
    it('should render balance component with the correct props', () => {
      expect(
        wrapper.find({ testID: 'text-message' }).props().children
      ).toContain(errorMessage);
    });
  });
});
