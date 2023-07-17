import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import AddActivityButton from '../../../../shared-components/addActivityButton';

import { SettingsIcon } from '../../../../assets/icons/Icon'


import SurveyContext from '../../../../context/SurveyContext';

const HomePage = ({ navigation }) => {
  const { surveyData } = useContext(SurveyContext);

  const activities = surveyData.activityParameters || [];

  const upcomingActivities = activities.filter(activity => activity.apiResponse && !activity.completed);
  const pendingActivities = activities.filter(activity => !activity.apiResponse && !activity.completed);
  
  console.log('-------------------------------')
  console.log('HOME ACTIVITIES : ', activities)
  console.log('HOME ACTIVITIES : ', activities.length)

  console.log('-------------------------------')

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {console.log('profile icon clicked');navigation.navigate('Profile')}} style={styles.settingsIcon}>
        <SettingsIcon />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello there!</Text>
        <Text style={[styles.subText, { marginTop: 20 }]}>
          These are your upcoming activities, ready for adventure?
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.body}>
          {upcomingActivities.length > 0 ? (
            upcomingActivities.map((activity) => (
              <TouchableOpacity
                key={activity.id}
                style={[styles.activityContainer, { marginTop: 5 }]}
                onPress={() => console.log(activity.id)}
              >
                <View style={styles.activityHeader}>
                  <Text style={styles.activityTitle}>{activity.name}</Text>
                </View>
                <Text style={styles.activityDetails}>Date: {activity.dateTime}</Text>
                <Text style={styles.activityDetails}>{activity.apiResponse?.name}</Text>
                <Text style={styles.activityDetails}>Destination: {activity.apiResponse?.address}</Text>
                <Button
                  title="More Details"
                  color="#595959"
                  onPress={() => navigation.navigate('ActivityDashboard', { activityId: activity.id })}
                />
              </TouchableOpacity>
            ))
          ) : null}

          {pendingActivities.length > 0 ? (
            <>
              <Text
                style={[
                  styles.subText,
                  { textAlign: "left", marginBottom: 10, marginTop: 10 },
                ]}
              >
                Pending activities:
              </Text>
              {pendingActivities.map((activity) => (
                <TouchableOpacity
                  key={activity.id}
                  style={styles.activityContainer}
                  onPress={() => console.log(activity.id)}
                >
                  <View style={styles.activityHeader}>
                    <Text style={styles.activityTitle}>{activity.name}</Text>
                  </View>
                  <Text style={styles.activityDetails}>Date: {activity.dateTime}</Text>
                  <Button
                    title="More Details"
                    color="#595959"
                    onPress={() => navigation.navigate('ActivityDashboard', { activityId: activity.id })}
                  />
                </TouchableOpacity>
              ))}
            </>
          ) : null}

          {/* Conditional rendering for no activities */}
          {upcomingActivities.length === 0 && pendingActivities.length === 0 && (
            <View style={styles.noActivitiesContainer}>
              <Text style={styles.noActivitiesText}>You have no activities at the moment</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <AddActivityButton navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    width: "100%",
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  header: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
  },
  body: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    overflow: "scroll",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 32,
  },
  subText: {
    fontSize: 16,
    color: "gray",
    textAlign: "left",
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  noActivitiesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noActivitiesText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activityContainer: {
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    width: Dimensions.get("window").width - 40,
  },
  activityHeader: {
    flexDirection: "column",
    marginBottom: 5,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 10,
    textAlign: "left",
  },
  activityDetails: {
    textAlign: "left",
    marginLeft: 10,
    marginBottom: 10,
  },

  settingsIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 50,
  },
});

export default HomePage;