import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';

import incoming from '../../../backend/incoming.json';
import { ImageItem } from './image-item';
import { NewPhotoButton } from './new-photo';
import { ModalPhotoGallery } from './new-photo/modal';

interface IInputState {
  modalVisible: boolean
}

interface IInputProps {
}

class AppNavigator extends Component<IInputProps, IInputState> {
  state = {
    modalVisible: false
  };

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

  openModal = () => this.setState({modalVisible: true});

  closeModal = () => this.setState({modalVisible: false});

  getNewPicture = ({preparedImg, name}: {preparedImg: string, name: string}) => {
    console.log('picture', name, preparedImg);
    // sendToServer({preparedImg, name});
  }

  render() {
    const { modalVisible } = this.state;
    const serverArrImgs = incoming ? incoming.user.imgs : [];
    const renderImgs = this.getImgs(serverArrImgs);

    return (
      <View style={styles.container} >
        <ScrollView>
          { renderImgs }
        </ScrollView>
        <NewPhotoButton
          openModal={this.openModal} />
        <ModalPhotoGallery
          closeModal={this.closeModal}
          modalVisible={modalVisible}
          getNewPicture={this.getNewPicture}
        />
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
