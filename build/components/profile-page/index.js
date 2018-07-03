import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import incoming from '../../../backend/incoming.json';
import { ModalPhotoGallery } from '../main-page/new-photo/modal';
const { width } = Dimensions.get('window');
class AppNavigator extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            modalVisible: false,
            name: '',
            avatarName: '',
            avatar: ''
        };
        this.openModal = () => this.setState({ modalVisible: true });
        this.closeModal = () => this.setState({ modalVisible: false });
        this.getNewPicture = ({ preparedImg, name }) => {
            this.setState({ avatarName: name, avatar: preparedImg });
            // sendToServer({preparedImg, name});
        };
        this.onChange = (name) => this.setState({ name });
        this.saveName = () => {
            const { name } = this.state;
            console.log('name', name);
        };
    }
    componentDidMount() {
        const { user: { avatar, name } } = incoming;
        this.setState({ avatar, name, avatarName: name });
    }
    render() {
        const { modalVisible } = this.state;
        const { user: { avatar, name } } = incoming;
        return (React.createElement(View, { style: styles.container },
            React.createElement(TouchableOpacity, { onPress: this.openModal },
                React.createElement(Image, { source: { uri: avatar }, style: styles.avatar })),
            React.createElement(FormInput, { containerStyle: styles.inputForm, value: name, onChangeText: this.onChange }),
            React.createElement(Button, { onPress: this.saveName, buttonStyle: styles.galleryButton, raised: true, title: 'Save Name' }),
            React.createElement(ModalPhotoGallery, { closeModal: this.closeModal, modalVisible: modalVisible, getNewPicture: this.getNewPicture })));
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
//# sourceMappingURL=index.js.map