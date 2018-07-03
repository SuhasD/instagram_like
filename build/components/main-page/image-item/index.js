import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
export const ImageItem = ({ item }) => (React.createElement(View, null,
    React.createElement(Image, { source: { uri: 'http://www.pitodoble.com/imagenes/nemo.jpg' }, style: styles.imageStyle }),
    React.createElement(Text, null, item.name)));
const styles = StyleSheet.create({
    imageStyle: {
        width,
        height: width
    }
});
//# sourceMappingURL=index.js.map