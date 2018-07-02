import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import incoming from '../../../backend/incoming.json';
class AppNavigator extends Component {
    constructor() {
        super(...arguments);
        this.addNewPhoto = () => {
            console.log('new Photo here...');
        };
    }
    render() {
        console.log('incoming', incoming);
        return (React.createElement(View, { style: styles.container },
            incoming.user.imgs.map(item => (React.createElement(View, { key: item.name },
                React.createElement(Image, { source: { uri: item.src }, style: {
                        width: 100,
                        height: 100
                    } }),
                React.createElement(Text, null, item.name)))),
            React.createElement(Text, null, "Main"),
            React.createElement(TouchableOpacity, { onPress: this.addNewPhoto, style: styles.touchContainer },
                React.createElement(Text, { style: styles.iconView },
                    React.createElement(FontAwesome, { name: 'plus-circle', size: 60 })),
                ";")));
    }
}
export default AppNavigator;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
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