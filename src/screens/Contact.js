import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Contacts from 'expo-contacts';

const Contact = () => {
  const navigation = useNavigation();

  const [invitedContacts, setInvitedContacts] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync();
        setContacts(data);
      }
    })();
  }, []);

  const handleInvite = (contactId) => {
    if (invitedContacts.includes(contactId)) {
      setInvitedContacts(invitedContacts.filter((id) => id !== contactId));
    } else {
      setInvitedContacts([...invitedContacts, contactId]);
    }
  };

  const isContactInvited = (contactId) => {
    return invitedContacts.includes(contactId);
  };
  const handleNext = () => {
    navigation.navigate("CreateActivity");
  };

  const displayContacts = () => {
    if(contacts && contacts.length !==0) {
        return contacts.map((contact, index) => {
            if(contact.hasOwnProperty('phoneNumbers')) {
                return (
                    <View key={contact.lookupKey} style={styles.contactItem}>
                      <MaterialIcons
                        name="person"
                        size={24}
                        color="black"
                        style={styles.profileIcon}
                      />
                      <Text style={styles.contactName}>{contact.firstName} {contact.lastName}</Text>
                      <TouchableOpacity
                        style={[
                          styles.inviteButton,
                          isContactInvited(contact.lookupKey) && styles.invitedButton,
                        ]}
                        onPress={() => handleInvite(contact.lookupKey)}
                      >
                        {isContactInvited(contact.lookupKey) ? (
                          <MaterialIcons name="check" size={24} color="white" />
                        ) : (
                          <Text style={styles.inviteButtonText}>Invite</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  )
            }
        })
    }

    return (
        <View>
            <Text>Syncing Contacts....</Text>
        </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Contact List</Text>
        <MaterialIcons name="search" size={24} color="black" />
      </View>
      <ScrollView contentContainerStyle={styles.contactList}>
        {displayContacts()}
      </ScrollView>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "white",
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10,
  },
  contactList: {
    flexGrow: 1,
    alignItems: "center",
    marginTop: 80,
    marginBottom: 60,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  profileIcon: {
    marginRight: 10,
  },
  contactName: {
    fontSize: 16,
  },
  inviteButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "grey",
    borderRadius: 5,
  },
  invitedButton: {
    backgroundColor: "green",
  },
  inviteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  nextButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});

export default Contact;
