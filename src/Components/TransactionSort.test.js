import { shallow } from 'enzyme';
import React from 'react';
import TransactionSort from './TransactionSort';

describe('TransactionSort', () => {
  describe('#render', () => {
    it('should call onSort with column date and order by ascending when the date is ordered descending and date toggle is pressed', () => {
      const sortType = 'date';
      const orderBy = 'asc';
      const onSort = jest.fn();
      const wrapper = shallow(<TransactionSort onSort={onSort} />);

      const dateToggle = wrapper.find({ testID: 'date-toggle' });
      dateToggle.simulate('press');

      expect(onSort).toHaveBeenCalledWith(sortType, orderBy);
    });

    it('should call onSort with column date and order by descending when the date is ordered ascending and date toggle is pressed', () => {
      const sortType = 'date';
      const orderBy = 'desc';
      const onSort = jest.fn();
      const wrapper = shallow(<TransactionSort onSort={onSort} />);

      const dateToggle = wrapper.find({ testID: 'date-toggle' });
      dateToggle.simulate('press');
      dateToggle.simulate('press');

      expect(onSort).toHaveBeenCalledWith(sortType, orderBy);
    });

    it('should call onSort with column nominal and order by descending when the nominal is not ordered yet and nominal toggle is pressed', () => {
      const sortType = 'nominal';
      const orderBy = 'desc';
      const onSort = jest.fn();
      const wrapper = shallow(<TransactionSort onSort={onSort} />);

      const nominalToggle = wrapper.find({ testID: 'nominal-toggle' });
      nominalToggle.simulate('press');

      expect(onSort).toHaveBeenCalledWith(sortType, orderBy);
    });

    it('should call onSort with column nominal and order by ascending when the nominal is not ordered yet and toggle is pressed twice', () => {
      const sortType = 'nominal';
      const orderBy = 'asc';
      const onSort = jest.fn();
      const wrapper = shallow(<TransactionSort onSort={onSort} />);

      const nominalToggle = wrapper.find({ testID: 'nominal-toggle' });
      nominalToggle.simulate('press');
      nominalToggle.simulate('press');

      expect(onSort).toHaveBeenCalledWith(sortType, orderBy);
    });
  });
});
