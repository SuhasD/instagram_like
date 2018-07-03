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

const { width } = Dimensions.get('window');

const getPhoto = async ({getNewPicture, closeModal}:
  {getNewPicture: any, closeModal: () => void}) => {
  const result = await Promise.all([
    Permissions.askAsync(Permissions.CAMERA),
    Permissions.askAsync(Permissions.CAMERA_ROLL)
  ]);
  if (result.some(({ status }) => status !== 'granted')) {
    Alert.alert('Camera & Camera Roll Permissions Required');
    return;
  }
  closeModal();
  const {
      cancelled,
      base64,
      uri
  } = await ImagePicker.launchCameraAsync({
      base64: true
  });
  if (!cancelled) {
      const preparedImg = `data:image/jpeg;base64,${base64}`;
      const name = uri.split('/').pop();
      getNewPicture({preparedImg, name});
  }
  };

  const getFromGalery = async ({getNewPicture, closeModal}:
    {getNewPicture: any, closeModal: () => void}) => {
    const result = await Promise.all([
      Permissions.askAsync(Permissions.CAMERA),
      Permissions.askAsync(Permissions.CAMERA_ROLL)
    ]);
    if (result.some(({ status }) => status !== 'granted')) {
      Alert.alert('Camera & Camera Roll Permissions Required');
      return;
    }
      const {
          cancelled,
          base64,
          uri
      } = await ImagePicker.launchImageLibraryAsync({
          base64: true
      });
      closeModal();
      if (!cancelled) {
          const preparedImg = `data:image/jpeg;base64,${base64}`;
          const name = uri.split('/').pop();
          getNewPicture({preparedImg, name});
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
          raised
          icon={{name: 'camera-alt'}}
          title='Take a Photo' />
        <Button
          onPress={() => getFromGalery({getNewPicture, closeModal})}
          buttonStyle={styles.galleryButton}
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
      backgroundColor: '#ffffff'
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
    color: 'black'
  },
  buttons: {
    flexDirection: 'row',
    padding: 20
  },
  photoButton: {
    backgroundColor: 'red',
    borderRadius: 6
  },
  galleryButton: {
    backgroundColor: 'green',
    borderRadius: 6
  }
});
