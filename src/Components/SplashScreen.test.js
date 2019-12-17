import React from 'react';
import { shallow } from 'enzyme';
import SInfo from 'react-native-sensitive-info';
import SplashScreen from './SplashScreen';

jest.mock('react-native-sensitive-info', () => {
  return { setItem: jest.fn(), getItem: jest.fn() };
});

describe('SplashScreen', () => {
  let wrapper;
  let navigation;
  let token;
  beforeEach(() => {
    token = 'kontolbayucilik';
    navigation = {
      navigate: jest.fn(),
      getParam: jest.fn()
    };
    jest.useFakeTimers();
    wrapper = shallow(<SplashScreen navigation={navigation} />);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.useRealTimers();
  });

  describe('#render', () => {
    it('should navigate to App when token is exist', async () => {
      SInfo.getItem.mockResolvedValueOnce(token);
      wrapper = shallow(<SplashScreen navigation={navigation} />);

      await flushPromises();
      jest.runAllTimers();

      expect(navigation.navigate).toHaveBeenCalledWith('App');
    });

    it('should navigate to Auth when token is not exist', async () => {
      SInfo.getItem.mockResolvedValueOnce('');
      wrapper = shallow(<SplashScreen navigation={navigation} />);

      await flushPromises();
      jest.runAllTimers();

      expect(navigation.navigate).toHaveBeenCalledWith('Auth');
    });
  });
});
