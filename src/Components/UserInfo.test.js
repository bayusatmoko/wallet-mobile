import React from 'react';
import { shallow } from 'enzyme';
import UserInfo from './UserInfo';

describe('UserInfo', () => {
  describe('#render', () => {
    let userInfo;
    let wrapper;
    beforeEach(() => {
      userInfo = {
        id: 1,
        name: 'Huda'
      };
      wrapper = shallow(<UserInfo user={userInfo} />);
    });
    it('should render balance info', () => {
      const textId = wrapper.find({ testID: 'user-id' });
      const textName = wrapper.find({ testID: 'user-name' });

      expect(textId.props().children).toBe(userInfo.id);
      expect(textName.props().children).toBe('Hi, ' + userInfo.name);
    });
  });
});
