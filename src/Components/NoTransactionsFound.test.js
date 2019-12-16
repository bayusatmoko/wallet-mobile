import React from 'react';
import { shallow } from 'enzyme';
import NoTransactionsFound from './NoTransactionsFound';

describe('NoTransactionFound', () => {
  describe('#render', () => {
    let noTransactionsFound;
    let wrapper;
    beforeEach(() => {
      noTransactionsFound = 'No Transaction Found';
      wrapper = shallow(<NoTransactionsFound />);
    });
    it('should render error', () => {
      expect(wrapper.find('Text').props().children).toBe(noTransactionsFound);
    });
  });
});
