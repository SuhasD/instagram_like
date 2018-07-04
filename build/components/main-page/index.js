var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ImageItem } from './image-item';
import { NewPhotoButton } from './new-photo';
import { ModalPhotoGallery } from './new-photo/modal';
import { updateImageCollection, getUserImgs } from '../../api';
import { LoaderComponent } from '../loader';
import { color } from '../constants';
class AppNavigator extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            modalVisible: false,
            loader: false,
            id: '',
            imgs: []
        };
        this.loadInfo = () => __awaiter(this, void 0, void 0, function* () {
            this.setState({ loader: true });
            const querySnapshot = yield getUserImgs();
            const imgs = [];
            const id = [];
            querySnapshot.forEach(doc => {
                imgs.push(doc.data());
                id.push(doc.id);
            });
            this.setState({ loader: false, imgs, id });
        });
        this.addNewPhoto = () => {
            console.log('new Photo here...');
        };
        this.getImgs = (arrImgs) => (arrImgs.map(item => (React.createElement(ImageItem, { key: item.imgs.name, item: item.imgs }))));
        this.openModal = () => this.setState({ modalVisible: true });
        this.closeModal = () => this.setState({ modalVisible: false });
        this.getNewPicture = ({ preparedImg, name }) => __awaiter(this, void 0, void 0, function* () {
            const imgs = { name, src: preparedImg };
            this.setState({ loader: true });
            yield updateImageCollection({ imgs });
            this.setState({ loader: false });
            this.loadInfo();
        });
    }
    componentDidMount() {
        this.loadInfo();
    }
    render() {
        const { modalVisible, imgs, loader } = this.state;
        const serverArrImgs = imgs;
        const renderImgs = this.getImgs(serverArrImgs);
        return (React.createElement(View, { style: styles.container },
            loader
                ? React.createElement(LoaderComponent, null)
                : React.createElement(ScrollView, null, renderImgs),
            !loader &&
                React.createElement(NewPhotoButton, { openModal: this.openModal }),
            React.createElement(ModalPhotoGallery, { closeModal: this.closeModal, modalVisible: modalVisible, getNewPicture: this.getNewPicture })));
    }
}
export default AppNavigator;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.first,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
//# sourceMappingURL=index.js.map