import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Dimensions, ScrollView } from 'react-native';
import MenuComponent from '../components/MenuComponent';
import AddActivityButton from '../components/addActivityButton'; 

import SurveyContext from '../context/SurveyContext';

const HomePage = ({ navigation }) => {

  const { surveyData } = useContext(SurveyContext);

  console.log('---',surveyData)


  const activities = [
    {
      id: 1,
      title: "Lunch out with my friends",
      date: "2023-06-22",
      time: "10:00 AM",
      destination: "Capilano Suspension Bridge",
      groups: [
        {
          id: 1,
          name: "Group 1",
          members: [
            { id: 1, name: "Jon Snow" },
            { id: 2, name: "Michael" },
            { id: 3, name: "Obika K" },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Hiking with the gang",
      date: "2023-06-23",
      time: "2:30 PM",
      destination: "Lynn Valley",
      groups: [
        {
          id: 3,
          name: "Group 3",
          members: [
            { id: 4, name: "Harry Potter" },
            { id: 5, name: "Sebastian" },
            { id: 6, name: "Lucas" },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Explore the Art Exhibitions",
      date: "2023-06-24",
      time: "4:00 PM",
      destination: "Vancouver Art Gallery",
      groups: [
        {
          id: 4,
          name: "Group 4",
          members: [
            { id: 7, name: "Milla" },
            { id: 8, name: "Stephanie" },
            { id: 9, name: "Zarah" },
            { id: 10, name: "Nismath" },
          ],
        },
      ],
    },
  ];

  const upcomingActivities = [activities[0]];
  const pendingActivities = [activities[1], activities[2]];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi User!</Text>
        <Text style={[styles.subText, { marginTop: 20 }]}>
          These are your upcoming activities:
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.body}>
        {upcomingActivities.length > 0 ? (
          upcomingActivities.map((activity) => (
            <TouchableOpacity
              key={activity.id}
              style={[styles.activityContainer, { marginTop: 10 }]}
              onPress={() => console.log(activity.details)}
            >
              <View style={styles.activityHeader}>
                {activity.groups.map((group) => (
                  <View key={group.id} style={styles.groupMembers}>
                    {group.members.length > 2 ? (
                      <>
                        <Text style={styles.memberName}>
                          {group.members[0].name},
                        </Text>
                        <Text style={styles.memberName}>
                          {group.members[1].name},
                        </Text>
                        <Text style={styles.memberName}>
                          +{group.members.length - 2} others
                        </Text>
                      </>
                    ) : (
                      group.members.map((member) => (
                        <Text key={member.id} style={styles.memberName}>
                          {member.name}
                        </Text>
                      ))
                    )}
                  </View>
                ))}
                <Text style={styles.activityTitle}>{activity.title}</Text>
              </View>
              <Text style={styles.activityDetails}>Date: {activity.date}</Text>
              <Text style={styles.activityDetails}>Time: {activity.time}</Text>
              <Text style={styles.activityDetails}>
                Destination: {activity.destination}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          // Display a message if there are no upcoming activities
          <Text style={styles.description}>
            You have no upcoming activities
          </Text>
        )}
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
                onPress={() => console.log(activity.details)}
              >
                <View style={styles.activityHeader}>
                  {activity.groups.map((group) => (
                    <View key={group.id} style={styles.groupMembers}>
                      {group.members.length > 2 ? (
                        <>
                          <Text style={styles.memberName}>
                            {group.members[0].name},
                          </Text>
                          <Text style={styles.memberName}>
                            {group.members[1].name},
                          </Text>
                          <Text style={styles.memberName}>
                            +{group.members.length - 2} others
                          </Text>
                        </>
                      ) : (
                        group.members.map((member) => (
                          <Text key={member.id} style={styles.memberName}>
                            {member.name}
                          </Text>
                        ))
                      )}
                    </View>
                  ))}
                  <Text style={styles.activityTitle}>{activity.title}</Text>
                </View>
                <Text style={styles.activityDetails}>
                  Date: {activity.date}
                </Text>
                <Text style={styles.activityDetails}>
                  Time: {activity.time}
                </Text>
                <Button
                  title="Play the Game"
                  color="black"
                  onPress={() => console.log("Button pressed")}
                />
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <Text style={styles.description}>You have no pending activities</Text>
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
    flex: 1,
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
    marginBottom: 20,
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
  groupImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 10,
  },
  groupMembers: {
    flexDirection: "row",
    alignItems: "center",
  },
  memberName: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 10
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
