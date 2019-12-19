import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
  Alert,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import favouriteIcon from '../Assets/Images/favorites.png';
import styles from './walletInfo.style';

class AddPayeeForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nickName: '',
      addClicked: false
    };
  }

  componentDidMount() {
    const { receiverName } = this.props;
    this.setState({
      nickName: receiverName
    });
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
          <TouchableOpacity
            className="favourite-button"
            testID="favourite-button"
            color="#8020AF"
            onPress={this._handleAdd}>
            <Image style={styles.favouriteIcon} source={favouriteIcon} />
          </TouchableOpacity>
        )}
        {this._displayFavouriteForm()}
      </View>
    );
  }
}

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
