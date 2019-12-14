import React from 'react';
import { shallow } from 'enzyme';
import ReceiverSearch from './ReceiverSearch';

describe('ReceiverSearch', () => {
  let wrapper;
  const query = 'fadelay@gmail.com';
  let mockedOnSubmit;
  beforeEach(() => {
    mockedOnSubmit = jest.fn();
    wrapper = shallow(<ReceiverSearch onSubmit={mockedOnSubmit} />);
  });

  describe('#render', () => {
    it('should call onSubmit with search query', () => {
      const searchInput = wrapper.find({ testID: 'input' });
      const searchButton = wrapper.find({ testID: 'button' });

      searchInput.simulate('changeText', query);
      searchButton.simulate('press');

      expect(mockedOnSubmit).toHaveBeenCalledWith(query);
    });
  });
});
