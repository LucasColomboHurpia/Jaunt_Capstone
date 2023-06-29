import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MenuComponent from '../components/MenuComponent';

const HomePage = ({ navigation }) => {
  const activities = [
    { id: 1, title: 'Activity 1', date: '2023-06-22', time: '10:00 AM', memberName: 'John Doe', destination: 'Capilano Suspension Bridge' },
    { id: 2, title: 'Activity 2', date: '2023-06-23', time: '2:30 PM', memberName: 'Jane Smith', destination: 'Lynn Valley' },
    { id: 3, title: 'Activity 3', date: '2023-06-24', time: '4:00 PM', memberName: 'Alex Johnson', destination: 'Squamish' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi User!</Text>
        <Text style={styles.subText}>Here are your upcoming activities</Text> 
      </View>
      <View style={styles.body}>
        {activities.length > 0 ? (
          activities.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={styles.activityContainer}
              onPress={() => console.log(activity.details)} 
            >
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activityDetails}>{activity.details}</Text>
              <Text>Date: {activity.date}</Text>
              <Text>Time: {activity.time}</Text>
              <Text>Destination: {activity.destination}</Text>
            </TouchableOpacity>
          ))
        ) : (
          // Display a message if there are no activities
          <Text style={styles.description}>You have no upcoming or pending activities</Text>
        )}
      </View>
      <View style={styles.menuContainer}>
        <MenuComponent navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  body: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    overflow: 'scroll', // Enable scrolling behavior
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60, 
  },
  subText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10, 
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  activityContainer: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: Dimensions.get('window').width - 40,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  activityDetails: {
    fontSize: 16,
  },
  menuContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default HomePage;