import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

export const ImageItem = ({
  item
}) => (
  <View>
    <Image
      source={{uri: 'http://www.pitodoble.com/imagenes/nemo.jpg'}}
      style={styles.imageStyle} />
      <Text>{item.name}</Text>
    </View>
);

const styles = StyleSheet.create({
  imageStyle: {
    width,
    height: width
  }
});
