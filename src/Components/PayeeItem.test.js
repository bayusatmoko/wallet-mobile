import React from 'react';
import { shallow } from 'enzyme';
import PayeeItem from './PayeeItem';

describe('ReceiverItem', () => {
  let wrapper;
  let mockedOnPress;
  const payee = {
    id: 1,
    userId: 1,
    payeeId: 2,
    nickName: 'Si Upin',
    payee: {
      name: 'Fadel',
      email: 'fadelcf@gmail.com',
      phoneNumber: '081234567890'
    }
  };
  beforeEach(() => {
    mockedOnPress = jest.fn();
    wrapper = shallow(<PayeeItem payee={payee} onPress={mockedOnPress} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('#render', () => {
    it('should render text Hello Dummy', () => {
      const nameElement = wrapper.find({ testID: 'text-name' });

      expect(nameElement.props().children).toEqual(payee.nickName);
    });

    it('should called onPress when payee-item is pressed', () => {
      const payeeItem = wrapper.find({ testID: 'payee-item' });

      payeeItem.simulate('press');

      expect(mockedOnPress).toHaveBeenCalled();
    });
  });
});
