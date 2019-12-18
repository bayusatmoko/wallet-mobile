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
      const amountMinimum = '9000';
      const defaultAmountMaximum = 99999999;
      const filterAmount = jest.fn();
      const wrapper = shallow(
        <TransactionFilter onHandleAmount={filterAmount} />
      );

      const inputAmountMinimum = wrapper.find({
        testID: 'input-amount-minimum'
      });
      inputAmountMinimum.simulate('changeText', amountMinimum);

      expect(filterAmount).toHaveBeenCalledWith(
        amountMinimum,
        defaultAmountMaximum
      );
    });

    it('should call the props function with the filter amount value with filter type is greater than or equal', () => {
      const defaultAmountMinimum = 0;
      const amountMaximum = '1000000';
      const filterAmount = jest.fn();
      const wrapper = shallow(
        <TransactionFilter onHandleAmount={filterAmount} />
      );

      const inputAmountMaximum = wrapper.find({
        testID: 'input-amount-maximum'
      });
      inputAmountMaximum.simulate('changeText', amountMaximum);

      expect(filterAmount).toHaveBeenCalledWith(
        defaultAmountMinimum,
        amountMaximum
      );
    });
  });
});
