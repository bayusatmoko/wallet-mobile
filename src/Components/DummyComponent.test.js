import React from 'react';
import { shallow } from 'enzyme';
import DummyComponent from './DummyComponent';

describe('DummyComponent', () => {
  let wrapper;
  let messageText;
  beforeEach(() => {
    messageText = 'Hello Dummy!';
    wrapper = shallow(<DummyComponent message={messageText} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render text Hello Dummy', () => {
      const textElement = wrapper.find({ testID: 'text' });

      expect(textElement.props().children).toEqual(messageText);
    });
  });
});
