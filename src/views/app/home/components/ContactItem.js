import { useContext } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import Text from "../../../../shared-components/Text";
import { CheckIcon } from "../../../../assets/icons/Icon";
import SurveyContext from "../../../../context/SurveyContext";
import { StyleSheet } from "react-native";

const ContactItem = (props) => {

    const { users, invitedContacts, setInvitedContacts } = useContext(SurveyContext);
    const { item } = props;
    const contactPhoneNumber = item.phoneNumbers[0].number.replace(/\D+/g, "");
    const picture = users[contactPhoneNumber]?.picture

    if (!item.hasOwnProperty("phoneNumbers")) {
        return (<></>);
    }

    const isContactInvited = (contactId) => {
        return invitedContacts.includes(contactId);
    };

    const handleInvite = (contactId) => {
        if (invitedContacts.includes(contactId)) {
          setInvitedContacts(invitedContacts.filter((id) => id !== contactId));
        } else {
          setInvitedContacts([...invitedContacts, contactId]);
        }
    };

    return (
        <View key={contactPhoneNumber} style={styles.contactItem}>
            <Image style={{ width: 40, height: 40, borderRadius: 100}} source={{ uri: `${picture}`}} />
            
            <Text variant="heading2">{item.firstName} {item.lastName}</Text>
            
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
    )
}

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

export default ContactItem;