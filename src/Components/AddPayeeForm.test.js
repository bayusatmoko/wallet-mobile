import React from 'react';
import { shallow } from 'enzyme';
import AddPayeeForm from './AddPayeeForm';

describe('AddPayeeForm', () => {
  describe('#render', () => {
    it('should render add button', () => {
      const wrapper = shallow(
        <AddPayeeForm id={1} receiverId={2} onAddFavourite={jest.fn()} />
      );

      expect(wrapper.find({ testID: 'favourite-button' })).toHaveLength(1);
    });

    it('should render the add payee form when the user click add button', () => {
      const wrapper = shallow(
        <AddPayeeForm id={1} receiverId={2} onAddFavourite={jest.fn()} />
      );

      const addButton = wrapper.find({ testID: 'favourite-button' });
      addButton.simulate('press');

      expect(wrapper.find({ testID: 'input-nickname' })).toHaveLength(1);
      expect(wrapper.find({ testID: 'add-button' })).toHaveLength(1);
    });

    it('should add the receiver to payee list when the user is typed nickname and click add button', () => {
      const nickName = 'Farah';
      const id = 1;
      const receiverId = 2;
      const mockAdd = jest.fn();
      const wrapper = shallow(
        <AddPayeeForm
          id={id}
          receiverId={receiverId}
          onAddFavourite={mockAdd}
        />
      );

      const favouriteButton = wrapper.find({ testID: 'favourite-button' });
      favouriteButton.simulate('press');
      wrapper
        .find({ testID: 'input-nickname' })
        .simulate('changeText', nickName);
      const addButton = wrapper.find({ testID: 'add-button' });
      addButton.simulate('press');

      expect(mockAdd).toHaveBeenCalledWith({
        userId: id,
        payeeUserId: receiverId,
        nickName
      });
    });
  });
});
