import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ActivityDashboard = ({ route, navigation }) => {
  const { item } = route.params;
  console.log(item);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.text}>Address: {item.address}</Text>
      <Text style={styles.text}>Description: {item.description}</Text>
      <Text style={styles.text}>Tags: {item.tags.join(', ')}</Text>

<View style={styles.buttonContainer}>
      <Button 
        title="See Map" 
        color= 'grey'
        onPress={() => navigation.navigate('MapPage', { item })}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
  },

  buttonContainer:{
    marginTop: 50,
  }
});

export default ActivityDashboard;
