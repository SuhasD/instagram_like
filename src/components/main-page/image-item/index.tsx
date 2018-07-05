import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
import { color } from '../../constants';

const { width } = Dimensions.get('window');

export const ImageItem = ({ // single image view
  item
}) => (
  <View style={styles.container}>
    <Image
      source={{uri: item.src}}
      style={styles.imageStyle} />
      <Text
        style={styles.imgTextStyle}
        >{item.name}</Text>
    </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: color.second
  },
  imageStyle: {
    width: width * 0.9,
    height: width * 0.9
  },
  imgTextStyle: {
    marginTop: 10,
    marginBottom: 10
  }
});
