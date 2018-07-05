import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
export const LoaderComponent = () => ( // loader view component
React.createElement(View, { style: [styles.containerLoader, styles.horizontalLoader] },
    React.createElement(ActivityIndicator, { size: 'large' })));
const styles = StyleSheet.create({
    containerLoader: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontalLoader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});
//# sourceMappingURL=index.js.map