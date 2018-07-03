import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
export const NewPhoto = ({ onPress }) => (React.createElement(TouchableOpacity, { onPress: onPress, style: styles.touchContainer },
    React.createElement(Text, { style: styles.iconView },
        React.createElement(FontAwesome, { name: 'plus-circle', size: 60 }))));
const styles = StyleSheet.create({
    touchContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'transparent'
    },
    iconView: {
        margin: 10,
        color: 'blue'
    }
});
//# sourceMappingURL=index.js.map