import { shallow } from 'enzyme';
import React from 'react';
import TransactionSort from './TransactionSort';

describe('TransactionSort', () => {
  describe('#render', () => {
    it('should call onSort with column date and order by ascending when the date is ordered descending and toggle is pressed', () => {
      const sortType = 'date';
      const orderBy = 'asc';
      const onSort = jest.fn();
      const wrapper = shallow(<TransactionSort onSort={onSort} />);

      const dateToggle = wrapper.find({ testID: 'date-toggle' });
      dateToggle.simulate('press');

      expect(onSort).toHaveBeenCalledWith(sortType, orderBy);
    });

    it('should call onSort with column date and order by descending when the date is ordered ascending and toggle is pressed', () => {
      const sortType = 'date';
      const orderBy = 'desc';
      const onSort = jest.fn();
      const wrapper = shallow(<TransactionSort onSort={onSort} />);

      const dateToggle = wrapper.find({ testID: 'date-toggle' });
      dateToggle.simulate('press');
      dateToggle.simulate('press');

      expect(onSort).toHaveBeenCalledWith(sortType, orderBy);
    });
  });
});
