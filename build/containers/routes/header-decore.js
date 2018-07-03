import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import incoming from '../../../backend/incoming.json';
export const LoginLogo = ({ onPress, goBack }) => {
    return (React.createElement(View, { style: styles.container },
        !onPress
            ? React.createElement(TouchableOpacity, { onPress: goBack, style: styles.touchContainer },
                React.createElement(Text, { style: styles.iconView },
                    React.createElement(FontAwesome, { name: 'arrow-left', size: 20 })))
            : React.createElement(View, { style: styles.emptyContainer }),
        React.createElement(Text, { style: styles.mainLogo }, "Instagram Like..."),
        !!onPress
            ? React.createElement(TouchableOpacity, { onPress: onPress, style: styles.touchContainer }, incoming
                ? React.createElement(View, null,
                    React.createElement(Image, { source: { uri: incoming.user.avatar }, style: styles.avatar }),
                    React.createElement(Text, null, incoming.user.name))
                : React.createElement(Text, { style: styles.iconView },
                    React.createElement(FontAwesome, { name: 'user-circle', size: 30 })))
            : React.createElement(View, { style: styles.emptyContainer })));
};
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        height: 60,
        backgroundColor: 'pink',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchContainer: {
        backgroundColor: 'transparent'
    },
    iconView: {
        margin: 10,
        color: 'black'
    },
    emptyContainer: {
        flex: 0.15
    },
    mainLogo: {
        flex: 0.7,
        textAlign: 'center'
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20
    }
});
//# sourceMappingURL=header-decore.js.map