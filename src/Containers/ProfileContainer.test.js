import React from 'react';
import { shallow } from 'enzyme';
import ProfilCointainer from './ProfilCointainer';

describe('ProfilCointainer', () => {
  describe('#render', () => {
    let userInfo;
    let wrapper;
    beforeEach(() => {
      userInfo = {
        id: 1,
        phoneNumber: '0876363',
        name: 'Huda'
      };
      wrapper = shallow(<ProfilCointainer user={userInfo} />);
    });
    it('should render user info', () => {
      const textPhone = wrapper.find({ testID: 'user-phone' });
      const textName = wrapper.find({ testID: 'user-name' });

      expect(textPhone.props().children).toBe(userInfo.phoneNumber);
      expect(textName.props().children).toBe('Hi, ' + userInfo.name);
    });

    it('should render the first name of user info', () => {
      userInfo.name = '';
      wrapper = shallow(<ProfilCointainer user={userInfo} />);
      const expectedName = 'UserInfo';

      const textName = wrapper.find({ testID: 'user-name' });
      expect(textName.props().children).toBe('Hi, ' + expectedName);
    });
  });
});
