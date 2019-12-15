import { shallow } from 'enzyme';
import React from 'react';
import TransactionFilter from './TransactionFilter';

describe('TransactionFilter', () => {
  describe('#render', () => {
    it('should call the props function with the filter description value', () => {
      const searchDescription = 'Deposit';
      const filterDescription = jest.fn();
      const wrapper = shallow(
        <TransactionFilter onHandleDescription={filterDescription} />
      );

      const inputDescription = wrapper.find({ testID: 'input-description' });
      inputDescription.simulate('changeText', searchDescription);

      expect(filterDescription).toHaveBeenCalledWith(searchDescription);
    });
  });
});
