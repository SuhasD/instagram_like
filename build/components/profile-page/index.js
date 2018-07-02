import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
class AppNavigator extends Component {
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(Text, null, "Profile")));
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