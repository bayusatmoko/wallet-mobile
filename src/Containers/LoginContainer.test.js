import React from 'react';
import { shallow } from 'enzyme';
import SInfo from 'react-native-sensitive-info';
import { when } from 'jest-when';
import userLogin from '../Services/userLogin';
import LoginContainer from './LoginContainer';

jest.mock('../Services/userLogin', () => jest.fn());
jest.mock('react-native-sensitive-info', () => {
  return { setItem: jest.fn(), getItem: jest.fn() };
});

describe('LoginContainer', () => {
  describe('#render', () => {
    let wrapper;
    let navigation;
    let user;
    let token;

    beforeEach(async function() {
      navigation = {
        navigate: jest.fn()
      };
      user = {
        username: 'fadelchaidarf@gmail.com',
        password: 'Bankbtpn99'
      };
      token = 'bayukecil';
      userLogin.mockResolvedValue(token);
      wrapper = shallow(<LoginContainer navigation={navigation} />);
      await flushPromises();
    });

    afterEach(function() {
      jest.clearAllMocks();
    });

    it('should navigate dashboard list', () => {
      wrapper
        .find({ testID: 'input-user' })
        .simulate('changeText', user.username);
      wrapper
        .find({ testID: 'input-password' })
        .simulate('changeText', user.password);
      wrapper.find('Button').simulate('press');

      expect(userLogin).toHaveBeenCalledWith(user);
      expect(SInfo.setItem).toHaveBeenCalledWith('token', token, {});
      expect(navigation.navigate).toHaveBeenCalledWith('Home');
    });
  });
});
