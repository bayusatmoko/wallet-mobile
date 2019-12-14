import React from 'react';
import { shallow } from 'enzyme';
import ReceiverItem from './ReceiverItem';

describe('ReceiverItem', () => {
  let wrapper;
  let user;
  let mockedOnPress = jest.fn();
  beforeEach(() => {
    user = {
      id: 1,
      name: 'Huda',
      email: 'hudalay@gmail.com',
      phoneNumber: '0812369420',
      wallet: {
        id: 1
      }
    };
    wrapper = shallow(<ReceiverItem user={user} onPress={mockedOnPress} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render text Hello Dummy', () => {
      const nameElement = wrapper.find({ testID: 'text-name' });

      expect(nameElement.props().children).toEqual(user.name);
    });

    it('should called onPress when receiver-item is pressed', () => {
      const receiverItem = wrapper.find({ testID: 'receiver-item' });

      receiverItem.simulate('press');

      expect(mockedOnPress).toHaveBeenCalled();
    });
  });
});
