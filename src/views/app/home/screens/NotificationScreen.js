import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import Aligner from "../../../../shared-components/Aligner";
import SocketContext from '../../../../context/SocketContext';
import api from "../../../../config/api";
import NotificationContext from "../../../../context/NotificationContext";
import { Image } from "react-native";
import Spacer from "../../../../shared-components/Spacer";
import Text from "../../../../shared-components/Text";

const NotificationScreen = () => {
  const { notifications, setNotifications } = useContext(NotificationContext)

  useEffect(() => {
    (async () => {
      try {
        const response = await api("notifications");
        const { data } = response;
        console.log(data)
        setNotifications(data.notifications);
      } catch (error) {
        console.log("Error fetching invitation requests: ", error);
      }
    })()

  }, []);

  return (
    <View style={styles.container}>
        <Spacer type="margin" position="top" customSize={40} />
        
        <Text variant="heading1" >Notifications</Text>
        
        <Spacer type="margin" position="bottom" customSize={20} />
      
      <Text variant="heading2">Invitations</Text>

      <Spacer type="margin" position="bottom" customSize={20} />

      {notifications.length > 0 ? (
        notifications.map((request, index) => (
            <View key={index}>
                <Spacer type="margin" position="bottom" key={index} customSize={20}>
                    <Aligner justify="flex-start">
                        {request.sender.picture && <Spacer type="margin" position="right" key={index} customSize={20}>
                            <Image style={styles.image} source={{ uri:`${request.sender.picture}` }} />
                        </Spacer>}
                        <Text >{request.text}</Text>
                    </Aligner>
                </Spacer>
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
    width: '100%',
  },
  heading: {
    fontSize: 32,
    fontWeight: 700,
    left: 0,
    marginTop: 81,
  },
  requestContainer: {
    padding: 10,
    marginBottom: 10,
  },
  body:
  {
    fontSize: 19,
  },
  image: { 
    width: 40,
    height: 40,
    borderRadius: 100
    }
});

export default NotificationScreen;