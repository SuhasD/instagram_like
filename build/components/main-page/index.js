import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import incoming from '../../../backend/incoming.json';
import { ImageItem } from './image-item';
import { NewPhotoButton } from './new-photo';
import { ModalPhotoGallery } from './new-photo/modal';
class AppNavigator extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            modalVisible: false
        };
        this.addNewPhoto = () => {
            console.log('new Photo here...');
        };
        this.getImgs = (arrImgs) => (arrImgs.map(item => (React.createElement(ImageItem, { key: item.name, item: item }))));
        this.openModal = () => this.setState({ modalVisible: true });
        this.closeModal = () => this.setState({ modalVisible: false });
        this.getNewPicture = ({ preparedImg, name }) => {
            console.log('picture', name, preparedImg);
            // sendToServer({preparedImg, name});
        };
    }
    render() {
        const { modalVisible } = this.state;
        const serverArrImgs = incoming ? incoming.user.imgs : [];
        const renderImgs = this.getImgs(serverArrImgs);
        return (React.createElement(View, { style: styles.container },
            React.createElement(ScrollView, null, renderImgs),
            React.createElement(NewPhotoButton, { openModal: this.openModal }),
            React.createElement(ModalPhotoGallery, { closeModal: this.closeModal, modalVisible: modalVisible, getNewPicture: this.getNewPicture })));
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
//# sourceMappingURL=index.js.map