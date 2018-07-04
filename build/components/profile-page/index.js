var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions, Text } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { ModalPhotoGallery } from '../main-page/new-photo/modal';
import { getUserData, updateNameAndAvatar } from '../../api';
import { LoaderComponent } from '../loader';
import { color } from '../constants';
const { width } = Dimensions.get('window');
class AppNavigator extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            modalVisible: false,
            name: '',
            avatarName: '',
            avatar: '',
            loader: false,
            id: ''
        };
        this.loadInfo = () => __awaiter(this, void 0, void 0, function* () {
            this.setState({ loader: true });
            const querySnapshot = yield getUserData();
            const arr = [];
            const docId = [];
            querySnapshot.forEach(doc => {
                arr.push(doc.data());
                docId.push(doc.id);
            });
            const { avatar, name } = arr[0];
            const id = docId[0];
            this.setState({ loader: false, avatar, name, id });
        });
        this.openModal = () => this.setState({ modalVisible: true });
        this.closeModal = () => this.setState({ modalVisible: false });
        this.getNewPicture = ({ preparedImg, name }) => __awaiter(this, void 0, void 0, function* () {
            const { id } = this.state;
            this.setState({ loader: true, avatarName: name, avatar: preparedImg });
            // it's bad practice make logic to get info from server inside component, usually I use redux-saga
            yield updateNameAndAvatar({ id, avatar: preparedImg, name: '' });
            this.setState({ loader: false });
        });
        this.onChange = (name) => this.setState({ name });
        this.saveName = () => {
            const { name, id } = this.state;
            updateNameAndAvatar({ id, name, avatar: '' });
        };
    }
    componentDidMount() {
        this.loadInfo();
    }
    render() {
        const { modalVisible, loader, avatar, name } = this.state;
        return (React.createElement(View, { style: styles.mainContainer }, loader
            ? React.createElement(LoaderComponent, null)
            : React.createElement(View, { style: styles.container },
                !!avatar
                    ? React.createElement(TouchableOpacity, { onPress: this.openModal },
                        React.createElement(Image, { source: { uri: avatar }, style: styles.avatar }))
                    : React.createElement(Text, { style: styles.avatarEmpty },
                        React.createElement(FontAwesome, { name: 'image', size: 250 })),
                React.createElement(FormInput, { containerStyle: styles.inputForm, value: name, onChangeText: this.onChange }),
                React.createElement(Button, { onPress: this.saveName, buttonStyle: styles.galleryButton, raised: true, title: 'Save Name' }),
                React.createElement(ModalPhotoGallery, { closeModal: this.closeModal, modalVisible: modalVisible, getNewPicture: this.getNewPicture }))));
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
        width: width * 0.8
    },
    galleryButton: {
        backgroundColor: color.third,
        borderRadius: 6,
        marginTop: 20
    }
});
//# sourceMappingURL=index.js.map