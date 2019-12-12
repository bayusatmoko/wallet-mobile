import React from 'react';
import { TextInput } from 'react-native';
import DummyComponent from '../Components/DummyComponent';

class SmartContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputText: ''
    };
  }

  render() {
    const { inputText } = this.state;
    return (
      <>
        <TextInput testID="text-input" onChangeText={text => this.setState({ inputText: text })} />
        <DummyComponent message={inputText} />
      </>
    );
  }
}

export default SmartContainer;
