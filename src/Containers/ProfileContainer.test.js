import React from 'react';
import { shallow } from 'enzyme';
import { when } from 'jest-when';
import SInfo from 'react-native-sensitive-info';
import getUserById from '../Services/getUserById';
import ProfileContainer from './ProfileContainer';

jest.mock('react-native-sensitive-info', () => {
  return { setItem: jest.fn(), getItem: jest.fn(), deleteItem: jest.fn() };
});

jest.mock('../Services/getUserById', () => jest.fn());

describe('ProfileContainer', () => {
  describe('#render', () => {
    let userInfo;
    let wrapper;
    let navigation;
    beforeEach(async () => {
      userInfo = {
        id: 1,
        name: 'Huda Udah',
        phoneNumber: '08237283',
        email: 'huda@gmail.com'
      };
      when(SInfo.getItem)
        .calledWith('token')
        .mockResolvedValue('token')
        .calledWith('userId')
        .mockResolvedValue('1');
      navigation = {
        navigate: jest.fn(),
        getParam: jest.fn()
      };
      getUserById.mockResolvedValueOnce({ data: userInfo });
      wrapper = shallow(<ProfileContainer navigation={navigation} />);
      await flushPromises();
    });

    it('should render user info', async () => {
      const textName = wrapper.find({ testID: 'text-name' });
      const textInitial = wrapper.find({ testID: 'text-initial' });
      const textPhone = wrapper.find({ testID: 'text-phone' });
      const textEmail = wrapper.find({ testID: 'text-email' });

      expect(textName.props().children).toBe(userInfo.name);
      // expect(textInitial.props().children).toBe('HU');
      expect(textPhone.props().children).toBe(userInfo.phoneNumber);
      expect(textEmail.props().children).toBe(userInfo.email);
    });

    it('should navigate to Splash screen and delete logged in data when logout is clicked', async () => {
      const buttonLogout = wrapper.find({ testID: 'touchable-logout' });

      buttonLogout.simulate('press');
      await flushPromises();

      expect(SInfo.deleteItem).toHaveBeenNthCalledWith(1, 'token', {});
      expect(SInfo.deleteItem).toHaveBeenNthCalledWith(2, 'userId', {});
      expect(SInfo.deleteItem).toHaveBeenNthCalledWith(3, 'walletId', {});
      expect(navigation.navigate).toHaveBeenCalledWith('Splash');
    });
  });
});
