import React, { useState, useEffect } from "react";
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
import Spacer from '../../../../shared-components/Spacer';
import {
  SingleProfileIcon,
  CheckIcon,
  SearchIcon,
} from "../../../../assets/icons/Icon";
import Aligner from "../../../../shared-components/Aligner";

const ContactListScreen = () => {
  const navigation = useNavigation();

  const [invitedContacts, setInvitedContacts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
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

  const handleSkip = () => {
    navigation.navigate("CreateActivity");
  };

  const handleSearchIconClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleSearch = () => {
    const filteredContacts = contacts.filter((contact) => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      return fullName.includes(searchQuery.toLowerCase());
    });
    setContacts(filteredContacts);
  };

  const displayContacts = () => {
    if (contacts && contacts.length !== 0) {
      return contacts.map((contact, index) => {
        if (contact.hasOwnProperty("phoneNumbers")) {
          return (
            <View key={contact.lookupKey} style={styles.contactItem}>
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
                  styles.inviteButton,
                  isContactInvited(contact.lookupKey) && styles.invitedButton,
                ]}
                onPress={() => handleInvite(contact.lookupKey)}
              >
                {isContactInvited(contact.lookupKey) ? (
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {!showSearchBar && (
          <Text variant="heading2" style={styles.title}>
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
          {displayContacts()}
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
    alignSelf: "flex-start",
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
