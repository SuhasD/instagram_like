import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
// import { FontAwesome } from '@expo/vector-icons';
import incoming from '../../../backend/incoming.json';
import { ImageItem } from './image-item';
import { NewPhoto } from './new-photo';
class AppNavigator extends Component {
    constructor() {
        super(...arguments);
        this.addNewPhoto = () => {
            console.log('new Photo here...');
        };
        this.getImgs = (arrImgs) => (arrImgs.map(item => (React.createElement(ImageItem, { key: item.name, item: item }))));
    }
    render() {
        const serverArrImgs = incoming ? incoming.user.imgs : [];
        const renderImgs = this.getImgs(serverArrImgs);
        return (React.createElement(View, { style: styles.container },
            React.createElement(ScrollView, null, renderImgs),
            React.createElement(NewPhoto, { onPress: this.addNewPhoto })));
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