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
    it('should call onSubmit with amount description', () => {
      const amountInput = wrapper.find({ testID: 'input-amount' });
      const descriptionInput = wrapper.find({ testID: 'input-description' });

      amountInput.simulate('changeText', nominal);
      descriptionInput.simulate('changeText', description);
      wrapper.find({ testID: 'button' }).simulate('press');

      expect(mockedOnSubmit).toHaveBeenCalledWith({ nominal, description });
    });

    it('should not display button when the nominal input is under Rp1.000', () => {
      wrapper.find({ testID: 'input-amount' }).simulate('changeText', 750);
      wrapper.find({ testID: 'button' }).simulate('press');

      expect(wrapper.find({ testID: 'text-error' }).length).toBe(1);
    });

    it('should not display button when the nominal input is under Rp100.000.000', () => {
      wrapper
        .find({ testID: 'input-amount' })
        .simulate('changeText', 120000000);
      wrapper.find({ testID: 'button' }).simulate('press');

      expect(wrapper.find({ testID: 'text-error' }).length).toBe(1);
    });
  });
});
