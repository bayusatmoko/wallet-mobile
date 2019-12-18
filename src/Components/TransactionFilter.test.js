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
      const filterType = 'lte';
      const filterAmount = jest.fn();
      const wrapper = shallow(
        <TransactionFilter onHandleAmount={filterAmount} />
      );

      const inputAmount = wrapper.find({ testID: 'input-amount' });
      inputAmount.simulate('changeText', searchAmount);

      expect(filterAmount).toHaveBeenCalledWith(searchAmount, filterType);
    });

    it('should call the props function with the filter amount value with filter type is greater than or equal', () => {
      const filterType = 'gte';
      const anotherFilterType = 'lte';
      const filterAmount = jest.fn();
      const wrapper = shallow(
        <TransactionFilter onHandleAmount={filterAmount} />
      );

      wrapper
        .find('Button')
        .at(1)
        .simulate('press', filterType);
      wrapper
        .find('Button')
        .at(0)
        .simulate('press', anotherFilterType);

      expect(filterAmount).toHaveBeenCalledWith(null, filterType);
    });

    it('should call the props function with the filter amount value with filter type is less than or equal', () => {
      const filterType = 'gte';
      const filterAmount = jest.fn();
      const wrapper = shallow(
        <TransactionFilter onHandleAmount={filterAmount} />
      );

      wrapper
        .find('Button')
        .at(1)
        .simulate('press', filterType);

      expect(filterAmount).toHaveBeenCalledWith(null, filterType);
    });
  });
});
