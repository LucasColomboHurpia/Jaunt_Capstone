import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

const MenuComponent = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Home')}
      >
        <Image
          source={require('./assets/home.png')} 
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Profile')}
      >
        <Image
          source={require('./assets/groupprofile.png')} 
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Notifications')}
      >
        <Image
          source={require('./assets/bell.png')} 
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 60,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
};

export default MenuComponent;
