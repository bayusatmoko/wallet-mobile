import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Button, View, TextInput, StyleSheet, Alert } from 'react-native';

class AddPayeeForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nickName: '',
      addClicked: false
    };
  }

  _handleAdd = () => {
    this.setState({
      addClicked: true
    });
  };

  _handleFavourite = () => {
    const { receiverId, id, onAddFavourite } = this.props;
    const { nickName } = this.state;
    if (nickName) {
      return onAddFavourite({
        userId: id,
        payeeUserId: receiverId,
        nickName
      });
    }
    const nickNameEmptyError = 'Nickname cannot be empty';
    Alert.alert(nickNameEmptyError);
  };

  _displayFavouriteForm = () => {
    const { addClicked, nickName } = this.state;
    if (addClicked) {
      return (
        <>
          <TextInput
            placeholder="Input nickname"
            testID="input-nickname"
            style={styles.input}
            maxLength={30}
            onChangeText={text => this.setState({ nickName: text })}
            value={nickName}
          />
          <Button
            testID="add-button"
            color="#8020AF"
            onPress={this._handleFavourite}
            title="Add to Favourite"
          />
        </>
      );
    }
  };

  render() {
    const { addClicked } = this.state;
    return (
      <View>
        {!addClicked && (
          <Button
            testID="favourite-button"
            color="#8020AF"
            onPress={this._handleAdd}
            title="Add to Favorite"
          />
        )}
        {this._displayFavouriteForm()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    marginRight: 30,
    marginLeft: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginBottom: 10,
    fontSize: 20,
    height: 50
  }
});

AddPayeeForm.defaultProps = {
  receiverId: 0,
  id: 0
};

AddPayeeForm.propTypes = {
  receiverId: PropTypes.number,
  id: PropTypes.number,
  onAddFavourite: PropTypes.func.isRequired
};

export default AddPayeeForm;
