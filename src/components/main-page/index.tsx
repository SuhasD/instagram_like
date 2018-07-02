import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import incoming from '../../../backend/incoming.json';

interface IInputState {
}

interface IInputProps {
}

class AppNavigator extends Component<IInputProps, IInputState> {

  addNewPhoto = () => {
    console.log('new Photo here...');
  }

  render() {
    console.log('incoming', incoming);
    return (
      <View style = { styles.container } >
        {
          incoming.user.imgs.map(item => (
            <View key={item.name}>
              <Image
                source={{uri: item.src}}
                style={{
                  width: 100,
                  height: 100
                }} />
                <Text>{item.name}</Text>
            </View>
          ))
        }
         <Text>Main</Text>

         <TouchableOpacity
           onPress={this.addNewPhoto}
           style={styles.touchContainer}>
           <Text style={styles.iconView}>
             <FontAwesome
               name={'plus-circle'}
               size={60} />
           </Text>;
         </TouchableOpacity>

      </View>
    );
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
