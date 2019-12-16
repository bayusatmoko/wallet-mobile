import { shallow } from 'enzyme';
import React from 'react';
import TransactionSort from './TransactionSort';

describe('TransactionSort', () => {
  describe('#render', () => {
    it('should call the props function with the filter description value', () => {
      const sortType = 'date';
      const orderBy = 'asc';
      const onSort = jest.fn();
      const wrapper = shallow(<TransactionSort onSort={onSort} />);

      const dateToggle = wrapper.find({ testID: 'date-toggle' });
      dateToggle.simulate('press');

      expect(onSort).toHaveBeenCalledWith(sortType, orderBy);
    });
  });
});
