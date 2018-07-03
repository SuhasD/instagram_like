var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import { View, TouchableOpacity, Text, Modal, StyleSheet, Dimensions, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { ImagePicker, Permissions } from 'expo';
const { width } = Dimensions.get('window');
const getPhoto = ({ getNewPicture, closeModal }) => __awaiter(this, void 0, void 0, function* () {
    const result = yield Promise.all([
        Permissions.askAsync(Permissions.CAMERA),
        Permissions.askAsync(Permissions.CAMERA_ROLL)
    ]);
    if (result.some(({ status }) => status !== 'granted')) {
        Alert.alert('Camera & Camera Roll Permissions Required');
        return;
    }
    closeModal();
    const { cancelled, base64, uri } = yield ImagePicker.launchCameraAsync({
        base64: true
    });
    if (!cancelled) {
        const preparedImg = `data:image/jpeg;base64,${base64}`;
        const name = uri.split('/').pop();
        getNewPicture({ preparedImg, name });
    }
});
const getFromGalery = ({ getNewPicture, closeModal }) => __awaiter(this, void 0, void 0, function* () {
    const result = yield Promise.all([
        Permissions.askAsync(Permissions.CAMERA),
        Permissions.askAsync(Permissions.CAMERA_ROLL)
    ]);
    if (result.some(({ status }) => status !== 'granted')) {
        Alert.alert('Camera & Camera Roll Permissions Required');
        return;
    }
    const { cancelled, base64, uri } = yield ImagePicker.launchImageLibraryAsync({
        base64: true
    });
    closeModal();
    if (!cancelled) {
        const preparedImg = `data:image/jpeg;base64,${base64}`;
        const name = uri.split('/').pop();
        getNewPicture({ preparedImg, name });
    }
});
export const ModalPhotoGallery = ({ closeModal, modalVisible, getNewPicture }) => (React.createElement(Modal, { visible: modalVisible, animationType: 'none', onRequestClose: closeModal },
    React.createElement(View, { style: styles.modalContainer },
        React.createElement(View, { style: styles.innerContainer },
            React.createElement(TouchableOpacity, { onPress: closeModal, style: styles.touchContainer },
                React.createElement(Text, { style: styles.iconView },
                    React.createElement(FontAwesome, { name: 'times-circle', size: 30 }))),
            React.createElement(Text, null, "Make a choice..."),
            React.createElement(View, { style: styles.buttons },
                React.createElement(Button, { onPress: () => getPhoto({ getNewPicture, closeModal }), buttonStyle: styles.photoButton, raised: true, icon: { name: 'camera-alt' }, title: 'Make Photo' }),
                React.createElement(Button, { onPress: () => getFromGalery({ getNewPicture, closeModal }), buttonStyle: styles.galleryButton, raised: true, icon: { name: 'insert-photo' }, title: 'Get from Gallery' }))))));
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
//# sourceMappingURL=modal.js.map