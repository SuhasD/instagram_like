import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

export const LoaderComponent = () => (
  <View style={[styles.containerLoader, styles.horizontalLoader]}>
    <ActivityIndicator size='large' />
  </View>
);

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
