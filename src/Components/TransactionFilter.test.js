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

    it('should call the props function with the filter amount value', () => {
      const searchAmount = '9000';
      const filterAmount = jest.fn();
      const wrapper = shallow(
        <TransactionFilter onHandleAmount={filterAmount} />
      );

      const inputAmount = wrapper.find({ testID: 'input-amount' });
      inputAmount.simulate('changeText', searchAmount);

      expect(filterAmount).toHaveBeenCalledWith(searchAmount);
    });
  });
});
