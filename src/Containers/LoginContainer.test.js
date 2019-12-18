import React from 'react';
import { shallow } from 'enzyme';
import SInfo from 'react-native-sensitive-info';
import jwtDecode from 'jwt-decode';
import userLogin from '../Services/userLogin';
import LoginContainer from './LoginContainer';

jest.mock('jwt-decode');
jest.mock('../Services/userLogin', () => jest.fn());
jest.mock('react-native-sensitive-info', () => {
  return { setItem: jest.fn(), getItem: jest.fn() };
});

describe('LoginContainer', () => {
  describe('#render', () => {
    let wrapper;
    let navigation;
    let user;
    let decodedResponse;
    let token;

    beforeEach(async function() {
      navigation = {
        navigate: jest.fn()
      };
      user = {
        username: 'fadelchaidarf@gmail.com',
        password: 'Bankbtpn99'
      };
      decodedResponse = {
        user: {
          id: 1,
          name: 'Fadel Chaidar Fachru',
          email: 'fadelchaidarf@gmail.com',
          phoneNumber: '083812345678',
          createdAt: '2019-12-17T10:09:07.077Z',
          updatedAt: '2019-12-17T10:09:07.077Z',
          wallet: {
            id: 1,
            balance: 25657500
          }
        },
        iat: 1576579241,
        exp: 1576665641
      };
      token = 'cuk';
      userLogin.mockResolvedValue({ data: { token } });
      jwtDecode.mockReturnValue(decodedResponse);
      wrapper = shallow(<LoginContainer navigation={navigation} />);
      await flushPromises();
    });

    afterEach(function() {
      jest.clearAllMocks();
    });

    it('should call login, save token and user to persistent storage and navigate to Splash', async () => {
      wrapper
        .find({ testID: 'input-user' })
        .simulate('changeText', user.username);
      wrapper
        .find({ testID: 'input-password' })
        .simulate('changeText', user.password);
      wrapper.find('TouchableOpacity').simulate('press');
      await flushPromises();

      expect(userLogin).toHaveBeenCalledWith(user);
      expect(SInfo.setItem).toHaveBeenNthCalledWith(1, 'token', token, {});
      expect(SInfo.setItem).toHaveBeenNthCalledWith(2, 'userId', '1', {});
      expect(SInfo.setItem).toHaveBeenNthCalledWith(3, 'walletId', '1', {});
      expect(navigation.navigate).toHaveBeenCalledWith('Splash');
    });
  });
});
