import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Aligner from "../../../../shared-components/Aligner";

const NotificationScreen = () => {
  const [invitationRequests, setInvitationRequests] = useState([]);

  useEffect(() => {
    const fetchInvitationRequests = async () => {
      try {
        const response = await fetch("API_URL");
        const data = await response.json();

        setInvitationRequests(data);
      } catch (error) {
        console.log("Error fetching invitation requests: ", error);
      }
    };

    fetchInvitationRequests();
  }, []);

  return (
    <View style={styles.container}>
        <Text style={styles.heading} >
          Notifications
        </Text>
      <Text style={styles.title}>Invitations</Text>
      {invitationRequests.length > 0 ? (
        invitationRequests.map((request, index) => (
          <View key={index} style={styles.requestContainer}>
            <Text>{request.senderName}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.body}>No invitation requests</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 35,
  },
  heading: {
    fontSize: 32,
    fontWeight: 700,
    left: 0,
    marginTop: 81,
  },
  requestContainer: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
  },
  body:
  {
    fontSize: 19,
  }
});

export default NotificationScreen;