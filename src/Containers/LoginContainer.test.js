import React from 'react';
import { shallow } from 'enzyme';
import SInfo from 'react-native-sensitive-info';
import LoginContainer from './LoginContainer';

describe('LoginContainer', () => {
  describe('#render', () => {
    let wrapper;
    let navigation;
    beforeEach(async function() {
      navigation = {
        navigate: jest.fn()
      };
      wrapper = shallow(<LoginContainer navigation={navigation} />);
      await flushPromises();
    });
    afterEach(function() {
      jest.clearAllMocks();
    });

    it('should navigate dashboard list', () => {
      wrapper.find('Button').simulate('press');

      expect(navigation.navigate).toHaveBeenCalledWith('Home');
    });
  });
});
