import React from 'react';
import { shallow } from 'enzyme';
import SmartContainer from './SmartContainer';

describe('SmartContainer', () => {
  let wrapper;
  let messageText;
  beforeEach(() => {
    messageText = 'Hello Dummy!';
    wrapper = shallow(<SmartContainer />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render DummyComponent text Hello Dummy', () => {
      const textInputElement = wrapper.find({ testID: 'text-input' });

      textInputElement.simulate('changeText', messageText);

      expect(wrapper.find('DummyComponent').props().message).toEqual(
        messageText
      );
    });
  });
});
