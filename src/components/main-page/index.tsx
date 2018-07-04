import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';

import { ImageItem } from './image-item';
import { NewPhotoButton } from './new-photo';
import { ModalPhotoGallery } from './new-photo/modal';
import {
  updateImageCollection,
  getUserImgs
} from '../../api';
import { LoaderComponent } from '../loader';
import { color } from '../constants';

interface IInputState {
  modalVisible: boolean,
  loader: boolean,
  id: any,
  imgs: {name: string, src: string}[]
}

interface IInputProps {
}

class AppNavigator extends Component<IInputProps, IInputState> {
  state = {
    modalVisible: false,
    loader: false,
    id: '',
    imgs: []
  };

  componentDidMount() {
    this.loadInfo();
  }

  loadInfo = async () => { // it's bad practice make logic to get info from server inside component, usually I use redux-saga
    this.setState({ loader: true });
    const querySnapshot = await getUserImgs();
    const imgs = [];
    const id = [];
    querySnapshot.forEach(doc => {
      imgs.push(doc.data());
      id.push(doc.id);
    });

    this.setState({ loader: false, imgs, id });
  }

  addNewPhoto = () => {
    console.log('new Photo here...');
  }

  getImgs = (arrImgs: any) => (
    arrImgs.map(item => (
      <ImageItem
        key={item.imgs.name}
        item={item.imgs} />
    ))
  )

  openModal = () => this.setState({modalVisible: true});

  closeModal = () => this.setState({modalVisible: false});

  getNewPicture = async ({preparedImg, name}: {preparedImg: string, name: string}) => {
    const imgs = {name, src: preparedImg};
    this.setState({ loader: true });
    await updateImageCollection({ imgs });

    this.setState({ loader: false });
    this.loadInfo();
  }

  render() {
    const { modalVisible, imgs, loader} = this.state;
    const serverArrImgs = imgs;
    const renderImgs = this.getImgs(serverArrImgs);

    return (
      <View style={styles.container} >
        {loader
          ? <LoaderComponent />
          : <ScrollView>
              { renderImgs }
            </ScrollView>
          }
        {!loader &&
          <NewPhotoButton
            openModal={this.openModal} />
        }
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
  container:  {
    flex:  1,
    backgroundColor: color.first,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
