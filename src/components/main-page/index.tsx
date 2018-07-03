import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';
// import { FontAwesome } from '@expo/vector-icons';

import incoming from '../../../backend/incoming.json';
import { ImageItem } from './image-item';
import { NewPhoto } from './new-photo';

interface IInputState {
}

interface IInputProps {
}

class AppNavigator extends Component<IInputProps, IInputState> {

  addNewPhoto = () => {
    console.log('new Photo here...');
  }

  getImgs = (arrImgs: any) => (
    arrImgs.map(item => (
      <ImageItem
        key={item.name}
        item={item} />
    ))
  )

  render() {
    const serverArrImgs = incoming ? incoming.user.imgs : [];
    const renderImgs = this.getImgs(serverArrImgs);

    return (
      <View style={styles.container} >
        <ScrollView>
          { renderImgs }
        </ScrollView>
        <NewPhoto
          onPress={this.addNewPhoto} />
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
