// src/components/AddActivityButton.js
import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

const AddActivityButton = ({ navigation }) => {
  return (
    <TouchableOpacity 
      style={styles.roundButton}
      onPress={() => navigation.navigate('CreateActivity')}
    >
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundButton: {
    height: 115,
    width: 115,
    borderRadius: 150,
    backgroundColor: '#F35F4B',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', 
    right: 10, 
    bottom: 20,

    // iOS shadow properties
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    // Android elevation
    elevation: 7,
  },
  buttonText: {
    fontSize: 35,
    color: 'white',
  },
});

export default AddActivityButton;
