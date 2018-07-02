import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

interface IInputState {
}

interface IInputProps {
}

class AppNavigator extends Component<IInputProps, IInputState> {

  render() {
    return (
      <View style = { styles.container } >
         <Text>Main</Text>
      </View>
    );
  }

}

export default AppNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
