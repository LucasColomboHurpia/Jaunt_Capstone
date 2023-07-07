import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import MenuComponent from '../components/MenuComponent';
import AddActivityButton from '../components/addActivityButton'; 

import SurveyContext from '../context/SurveyContext';


const HomePage = ({ navigation }) => {

  const { surveyData } = useContext(SurveyContext);

  console.log('---',surveyData)

  const activities = [
    { id: 1, title: 'Activity 1', date: '2023-06-22', time: '10:00 AM', memberName: 'John Doe', destination: 'Capilano Suspension Bridge' },
    { id: 2, title: 'Activity 2', date: '2023-06-23', time: '2:30 PM', memberName: 'Jane Smith', destination: 'Lynn Valley' },
    { id: 3, title: 'New Activity', date: '2023-06-24', time: '4:00 PM', memberName: 'Alex Johnson', destination: 'Vancouver Art Gallery' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            <Text style={styles.description}>You have no upcoming or pending activities</Text>
          )}
        </View>
      </ScrollView>
      <AddActivityButton navigation={navigation} />
      <MenuComponent navigation={navigation} />
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
        width: '100%',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',

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

  addActivityButton: {
    position: 'absolute', 
    right: 10, 
    bottom: 90, 
    
    
  },
  roundButton: {
    height: 110,
    width: 110,
    borderRadius: 150,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
  },

});

export default HomePage;