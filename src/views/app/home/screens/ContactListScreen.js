import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";

import Text from "../../../../shared-components/Text";
import { useNavigation } from "@react-navigation/native";
import * as Contacts from "expo-contacts";
import Button from "../../../../shared-components/Button";
import {
  SingleProfileIcon,
  CheckIcon,
  SearchIcon,
} from "../../../../assets/icons/Icon";
import Aligner from "../../../../shared-components/Aligner";
import Spacer from '../../../../shared-components/Spacer';
import api from "../../../../config/api";
import SurveyContext from '../../../../context/SurveyContext';
import { useTheme } from "styled-components";
import { Image } from "react-native";

const ContactListScreen = () => {
  const navigation = useNavigation();
  const {users, setUsers, invitedContacts, setInvitedContacts, registeredContacts, setRegisteredContacts} = useContext(SurveyContext);
//   const [registeredContacts, setRegisteredContacts] = useState([]);
  const [unregisteredContacts, setUnregisteredContacts] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme()

  useEffect(() => {
    (async () => {
        try { 
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === "granted") {
                const { data } = await Contacts.getContactsAsync();
                const result = [];
                data.forEach((contact, index) => {
                    if (contact.hasOwnProperty("phoneNumbers")) {
                        result.push(contact.phoneNumbers[0].number.replace(/\D+/g, ""))
                    }
                })

                const r = await api.post(`users/verifyContacts`, {contacts: result})
                const { users } = r.data;
                setUsers(users)

                const unregisteredContacts = [];
                const registeredContacts = [];

                data.forEach(contact => {
                    if (contact.hasOwnProperty("phoneNumbers")) {
                        contactPhoneNumber = contact.phoneNumbers[0].number.replace(/\D+/g, "");
                        const currentUser = users[contactPhoneNumber];
                        if(contactPhoneNumber === currentUser?.phoneNumber) {
                            registeredContacts.push(contact)
                        }
                        else {
                            unregisteredContacts.push(contact)
                        }
                    }
                    else {
                        unregisteredContacts.push(contact)
                    }
                })

                setRegisteredContacts(registeredContacts);
                setUnregisteredContacts(unregisteredContacts);
            }
      } catch (error) {
        console.log(error)
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
    console.log(invitedContacts)
    navigation.navigate("CreateActivity");
  };

  const handleSkip = () => {
    navigation.navigate("CreateActivity");
  };

  const handleSearchIconClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleSearch = () => {
    const filteredContacts = registeredContacts.filter((contact) => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    });
    setRegisteredContacts(filteredContacts);
  };

  const displayRegisteredContacts = () => {
    if (registeredContacts && registeredContacts.length !== 0) {
      return registeredContacts.map((contact, index) => {
        if (contact.hasOwnProperty("phoneNumbers")) {
            const contactPhoneNumber = contact.phoneNumbers[0].number.replace(/\D+/g, "");
            const picture = users[contactPhoneNumber]?.picture
          return (
            <View key={contactPhoneNumber} style={styles.contactItem}>
              <Image style={{ width: 40, height: 40, borderRadius: 100}} source={{ uri: `${picture}`}} />
              <Text variant="heading2">
                {contact.firstName} {contact.lastName}
              </Text>
              <TouchableOpacity
                style={[
                  styles.inviteButton,
                  isContactInvited(contactPhoneNumber) && styles.invitedButton,
                ]}
                onPress={() => handleInvite(contactPhoneNumber)}
              >
                {isContactInvited(contactPhoneNumber) ? (
                  <CheckIcon name="check" />
                ) : (
                  <Text style={styles.inviteButtonText}>Invite</Text>
                )}
              </TouchableOpacity>
            </View>
          );
        }
      });
    }

    return (
      <View>
        <Text>Syncing Contacts....</Text>
      </View>
    );
  };

  const displayUnregisteredContacts = () => {
    if (unregisteredContacts && unregisteredContacts.length !== 0) {
        return unregisteredContacts.map((contact, index) => {
        if (contact.hasOwnProperty("phoneNumbers")) {
            return (
                <View key={contact.id} style={styles.contactItem}>
                <SingleProfileIcon
                    name="person"
                    size={24}
                    style={styles.profileIcon}
                />
                <Text style={styles.contactName}>
                    {contact.firstName} {contact.lastName}
                </Text>
                <TouchableOpacity
                    style={[
                    styles.inviteButton
                    ]}
                >
                    
                    <Text style={styles.inviteButtonText}>SMS</Text>
                </TouchableOpacity>
                </View>
            );
                }
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {!showSearchBar && (
          <Text variant="heading1" style={styles.title}>
            Contact List
          </Text>
        )}
        {showSearchBar && (
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search contacts"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
          </View>
        )}
        <TouchableOpacity onPress={handleSearchIconClick}>
          <SearchIcon
            name="search"
            size={24}
            color="black"
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.contactList}>
            {displayRegisteredContacts()}

            <Spacer type="margin" position="bottom" customSize={20} />
          
                {/* <Text variant="heading2" options={{ color: theme.colors.primary.default}}>Invite to Jaunt</Text>

                <Spacer type="margin" position="bottom" customSize={40} />

                {displayUnregisteredContacts()} */}
        </ScrollView>
      </View>
      <Spacer type="margin" position="bottom" customSize={5}>
        <Aligner>
          <Button
            variant="sm"
            text="Next"
            type="primary"
            onPress={handleNext}
          />
        </Aligner>
        <Aligner>
          <Button
            variant="sm"
            text="Skip"
            type="tertiary"
            onPress={handleSkip}
          />
        </Aligner>
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    elevation: 4,
    backgroundColor: "white",
  },
  searchBar: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 10,
  },
  contactList: {
    alignItems: "center",
    marginTop: 22,
  },
  contactItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 21,
    height: 45,
  },
  contactName: {
    fontSize: 18,
  },
  inviteButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "white",
    borderRadius: 5,
  },
  inviteButtonText: {
    color: "grey",
    fontWeight: "bold",
  },
  searchIcon: {
    marginRight: 10,
  },
});

export default ContactListScreen;