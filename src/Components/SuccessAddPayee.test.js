import React from 'react';
import { shallow } from 'enzyme';
import SuccessAddPayee from './SuccessAddPayee';

describe('SuccessAddPayee', () => {
  it('should render success add payee message', () => {
    const wrapper = shallow(<SuccessAddPayee />);

    expect(
      wrapper
        .find('Text')
        .first()
        .props().children
    ).toBe('Success');
    expect(
      wrapper
        .find('Text')
        .last()
        .props().children
    ).toBe('Payee successfully added');
  });
});
