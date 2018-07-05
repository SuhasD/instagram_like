import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Modal,
    StyleSheet,
    Dimensions,
    Alert
} from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { ImagePicker, Permissions } from 'expo';
import { color } from '../../constants';

// this is modal window (ask photo or gallery) and two function work with camera user and gallery user

const { width } = Dimensions.get('window');

const getPhoto = async ({getNewPicture, closeModal}: // async function to get photo from camera
  {getNewPicture: any, closeModal: () => void}) => {
  const result = await Promise.all([
    Permissions.askAsync(Permissions.CAMERA), // ask permission
    Permissions.askAsync(Permissions.CAMERA_ROLL) // ask permission
  ]);
  if (result.some(({ status }) => status !== 'granted')) {
    Alert.alert('Camera & Camera Roll Permissions Required'); // if permission deny
    return;
  }
  closeModal();
  const {
      cancelled,
      base64,
      uri
  } = await ImagePicker.launchCameraAsync({
      base64: true, // use base64 format to image
      quality: 0 // use low quality to save memory on server and fast connection
  } as any) as any;
  if (!cancelled) {
      const preparedImg = `data:image/jpeg;base64,${base64}`;
      const name = uri.split('/').pop();
      getNewPicture({preparedImg, name}); // send image to parent component
  }
  };

  const getFromGalery = async ({getNewPicture, closeModal}: // async function to get image from gallery
    {getNewPicture: any, closeModal: () => void}) => {
    const result = await Promise.all([
      Permissions.askAsync(Permissions.CAMERA), // ask permission
      Permissions.askAsync(Permissions.CAMERA_ROLL) // ask permission
    ]);
    if (result.some(({ status }) => status !== 'granted')) {
      Alert.alert('Gallery Permissions Required'); // if permission deny
      return;
    }
      const {
          cancelled,
          base64,
          uri
      } = await ImagePicker.launchImageLibraryAsync({
          base64: true, // use base64 format to image
          quality: 0 // use low quality to save memory on server and fast connection
      }) as any;
      closeModal();
      if (!cancelled) {
          const preparedImg = `data:image/jpeg;base64,${base64}`;
          const name = uri.split('/').pop();
          getNewPicture({preparedImg, name}); // send image to parent component
      }
  };

export const ModalPhotoGallery = ({
  closeModal,
  modalVisible,
  getNewPicture
}) => (
  <Modal
  visible={modalVisible}
  animationType='none'
  onRequestClose={closeModal} >
  <View style={styles.modalContainer}>
    <View style={styles.innerContainer}>
      <TouchableOpacity
        onPress={closeModal}
        style={styles.touchContainer}>
        <Text style={styles.iconView}>
          <FontAwesome
            name={'times-circle'}
            size={30} />
        </Text>
      </TouchableOpacity>
      <Text>Make a choice...</Text>
      <View style={styles.buttons} >
        <Button
          onPress={() => getPhoto({getNewPicture, closeModal})}
          buttonStyle={styles.photoButton}
          containerViewStyle={styles.buttonContainer}
          raised
          icon={{name: 'camera-alt'}}
          title='Take a Photo' />
        <Button
          onPress={() => getFromGalery({getNewPicture, closeModal})}
          buttonStyle={styles.galleryButton}
          containerViewStyle={styles.buttonContainer}
          raised
          icon={{name: 'insert-photo'}}
          title='Get from Gallery' />
      </View>
    </View>
  </View>
</Modal>

);

const styles = StyleSheet.create({
  modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: color.first
    },
  innerContainer: {
    width,
    alignItems: 'center',
    padding: 20
  },
  touchContainer: {
    alignSelf: 'flex-end'
  },
  iconView: {
    color: color.third
  },
  buttons: {
    flexDirection: 'row',
    padding: 20
  },
  buttonContainer: {
    overflow: 'hidden',
    backgroundColor: 'transparent'
  },
  photoButton: {
    backgroundColor: color.third,
    borderRadius: 6
  },
  galleryButton: {
    backgroundColor: color.fourth,
    borderRadius: 6
  }
});
