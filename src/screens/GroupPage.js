import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import MenuComponent from "../components/MenuComponent";
import SurveyContext from '../context/SurveyContext';

const GroupPage = ({ navigation }) => {
  const { surveyData } = useContext(SurveyContext);
  const activities = surveyData.activityParameters || [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Activities</Text>
      </View>
      <View style={styles.body}>
        {activities.length > 0 ? (
          activities.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={styles.activityContainer}
              onPress={() => console.log(activity.id)}
            >
              <View style={styles.activityHeader}>
                <Text style={styles.activityTitle}>{activity.name}</Text>
              </View>
              <Text style={styles.activityDetails}>Date: {activity.dateTime}</Text>
              <Text style={styles.activityDetails}>{activity.apiResponse?.name}</Text>
              <Text style={styles.activityDetails}>Destination: {activity.apiResponse?.address}</Text>
              <TouchableOpacity
                style={styles.moreDetailsButton}
                onPress={() => navigation.navigate('ActivityDashboard', { activityId: activity.id })}    
                >
                <Text style={styles.moreDetailsButtonText}>More Details</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noActivitiesText}>No activities yet!</Text>
        )}
      </View>
      <MenuComponent navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  body: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  activityContainer: {
    backgroundColor: "lightgray",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
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
  moreDetailsButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#595959",
    borderRadius: 5,
  },
  moreDetailsButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  noActivitiesText: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
  },
});

export default GroupPage;
