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
    height: 110,
    width: 110,
    borderRadius: 150,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', 
    right: 10, 
    bottom: 20,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },
});

export default AddActivityButton;
