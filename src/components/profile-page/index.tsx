import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Text
} from 'react-native';

import { FormInput, Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { ModalPhotoGallery } from '../main-page/new-photo/modal';
import { getUserData, updateNameAndAvatar } from '../../api';
import { LoaderComponent } from '../loader';
import { color } from '../constants';

const { width } = Dimensions.get('window');

interface IInputState {
  modalVisible: boolean,
  name: string,
  avatarName: string,
  avatar: string,
  loader: boolean,
  id: any
}

interface IInputProps {
}

class AppNavigator extends Component<IInputProps, IInputState>  {
  state = {
    modalVisible: false, // switcher to modal photo/gallery
    name: '', // user name
    avatarName: '', // avatar name(image)
    avatar: '', // user avatar
    loader: false, // switcher to loader
    id: '' // user id (from server)
  };

  componentDidMount() {
    /* get user info(name, avatar) from server
     !!! it's bad practice make logic to get info from server inside component, usually I use redux-saga */
    this.loadInfo();
  }

  loadInfo = async () => {
    this.setState({ loader: true });
    const querySnapshot = await getUserData();
    const arr = [];
    const docId = [];
    querySnapshot.forEach(doc => {
      arr.push(doc.data());
      docId.push(doc.id);
    });

    const { avatar, name } = arr[0];
    const id = docId[0];
    this.setState({ loader: false, avatar, name, id });
  }

  openModal = () => this.setState({modalVisible: true});

  closeModal = () => this.setState({modalVisible: false});

  getNewPicture = async ({preparedImg, name}: {preparedImg: string, name: string}) => {
    /* function to get new image from user device */
    const { id } = this.state;
    this.setState({ loader: true, avatarName: name, avatar: preparedImg });
                          // it's bad practice make logic to get info from server inside component, usually I use redux-saga
    await updateNameAndAvatar({ id, avatar: preparedImg, name: '' });
    this.setState({ loader: false });
  }

  onChange = (name: string) => this.setState({name}); // change name function

  saveName = () => { // save name user to server
    const { name, id } = this.state;
    updateNameAndAvatar({ id, name, avatar: '' });
  }

  render() {
    const { modalVisible, loader, avatar, name } = this.state;

    return (
      <View style={styles.mainContainer}>
        {loader
          ? <LoaderComponent />
          : <View style={styles.container} >
            {!!avatar
              ? <TouchableOpacity
                onPress={this.openModal} >
                <Image
                  source={{uri: avatar}}
                  style={styles.avatar} />
                </TouchableOpacity>
              : <Text style={styles.avatarEmpty}>
                  <FontAwesome
                    name={'image'}
                    size={250} />
                </Text>
            }
            <FormInput
              containerStyle={styles.inputForm}
              value={name}
              onChangeText={this.onChange}/>
            <Button
              onPress={this.saveName}
              buttonStyle={styles.galleryButton}
              containerViewStyle={styles.buttonContainer}
              raised
              title='Save Name' />
            <ModalPhotoGallery
              closeModal={this.closeModal}
              modalVisible={modalVisible}
              getNewPicture={this.getNewPicture}
            />
          </View>
        }
      </View>
    );
  }

}

export default AppNavigator;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: color.first,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  avatar: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 20
  },
  avatarEmpty: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 20,
    textAlign: 'center',
    color: color.second
  },
  inputForm: {
    width: width * 0.8,
    marginBottom: 20
  },
  galleryButton: {
    backgroundColor: color.third,
    borderRadius: 6
  },
  buttonContainer: {
    overflow: 'hidden',
    backgroundColor: 'transparent'
  }
});
