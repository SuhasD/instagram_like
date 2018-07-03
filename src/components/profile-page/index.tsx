import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';

import { FormInput, Button } from 'react-native-elements';
import incoming from '../../../backend/incoming.json';
import { ModalPhotoGallery } from '../main-page/new-photo/modal';
import { getUserData } from '../../api';

const { width } = Dimensions.get('window');

interface IInputState {
  modalVisible: boolean,
  name: string,
  avatarName: string,
  avatar: string
}

interface IInputProps {
}

class AppNavigator extends Component<IInputProps, IInputState>  {
  state = {
    modalVisible: false,
    name: '',
    avatarName: '',
    avatar: ''
  };

  async componentDidMount() {
    const {user: {avatar, name}} = incoming;
    this.setState({avatar, name, avatarName: name});

    const querySnapshot = await getUserData();

    querySnapshot.forEach(doc => {
      console.log(doc.data());
    });
  }

  openModal = () => this.setState({modalVisible: true});

  closeModal = () => this.setState({modalVisible: false});

  getNewPicture = ({preparedImg, name}: {preparedImg: string, name: string}) => {
    this.setState({avatarName: name, avatar: preparedImg});
    // sendToServer({preparedImg, name});
  }

  onChange = (name: string) => this.setState({name});

  saveName = () => {
    const { name } = this.state;
    console.log('name', name);
  }

  render() {
    const { modalVisible } = this.state;
    const {user: {avatar, name}} = incoming;

    return (
      <View style={styles.container} >
        <TouchableOpacity
            onPress={this.openModal} >
            <Image
              source={{uri: avatar}}
              style={styles.avatar} />
          </TouchableOpacity>
          <FormInput
            containerStyle={styles.inputForm}
            value={name}
            onChangeText={this.onChange}/>
          <Button
            onPress={this.saveName}
            buttonStyle={styles.galleryButton}
            raised
            title='Save Name' />
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
    justifyContent: 'center',
    padding: 20
  },
  avatar: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 20
  },
  inputForm: {
    width: width * 0.8
  },
  galleryButton: {
    backgroundColor: 'green',
    borderRadius: 6,
    marginTop: 20
  }
});
