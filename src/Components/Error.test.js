import React from 'react';
import { shallow } from 'enzyme';
import Error from './Error';

describe('Error', () => {
  describe('#render', () => {
    let error;
    let wrapper;
    beforeEach(() => {
      error = 'Network Error';
      wrapper = shallow(<Error message={error} />);
    });
    it('should render error', () => {
      expect(wrapper.find('Text').props().children).toBe(error);
    });
  });
});
