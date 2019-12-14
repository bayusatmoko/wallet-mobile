import React from 'react';
import { shallow } from 'enzyme';
import TransactionForm from './TransactionForm';

describe('TransactionForm', () => {
  let wrapper;
  const nominal = 10000;
  const description = 'Top up gan';
  let mockedOnSubmit;
  beforeEach(() => {
    mockedOnSubmit = jest.fn();
    wrapper = shallow(<TransactionForm onSubmit={mockedOnSubmit} />);
  });

  describe('#render', () => {
    it('should call onSubmit with search query', () => {
      const amountInput = wrapper.find({ testID: 'input-amount' });
      const descriptionInput = wrapper.find({ testID: 'input-description' });
      const submitButton = wrapper.find({ testID: 'button' });

      amountInput.simulate('changeText', nominal);
      descriptionInput.simulate('changeText', description);
      submitButton.simulate('press');

      expect(mockedOnSubmit).toHaveBeenCalledWith({ nominal, description });
    });
  });
});
