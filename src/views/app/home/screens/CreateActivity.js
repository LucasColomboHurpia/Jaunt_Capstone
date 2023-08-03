import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TextInput, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SurveyContext from '../../../../context/SurveyContext';
import uuid from 'react-native-uuid';
import SocketContext from '../../../../context/SocketContext';
import Button from "../../../../shared-components/Button";
import Text from "../../../../shared-components/Text";
import { GroupProfileIcon } from "../../../../assets/icons/Icon";
import AuthContext from '../../../../context/AuthContext';
import { Image } from 'react-native';
import api from '../../../../config/api';

const HeaderSection = () => {
  return (
    <View style={styles.headerSection}>
      <Text variant="heading1">Create an activity</Text>
    </View>
  );
};

const MemberSection = () => {
  const navigation = useNavigation();
  const { invitedContacts, users } = useContext(SurveyContext);
  
  const displayInvitedContacts = () => {    
    if(invitedContacts) {
        return invitedContacts.map(contact => {
        return <Image style={{ 
                width: 40, 
                height: 40,
                borderRadius: 100,
                marginLeft: -20,
                zIndex: 2,
                position: 'relative'
            }} source={{uri: `${users[contact]?.picture}`}} />;
        })
    }
  }
  
  return (
    <View style={styles.memberSection}>
      <Text variant="labelBg">Members</Text>
      <View style={styles.memberContent}>
        <GroupProfileIcon style = {styles.profileIcon} color = "#0BC9B9"/>
    
        <Text variant = "labelBg" style = {styles.inviteText}>Invite:</Text>
    
        <View style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: 'center'
        }}>
            <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("ContactListScreen")}
            > 
            <Text style={styles.addButtonIcon}>+</Text>
            </TouchableOpacity>

            {displayInvitedContacts()}
        </View>
      </View>
    </View>
  );
};

const FormSection = ({
  activityName,
  setActivityName,
  date,
  setDate,
  hour,
  setHour,
  minute,
  setMinute,
}) => {
  return (
    <View style={styles.formSection}>
      <Text variant="labelBg">Activity Name</Text>
      <TextInput
        style={styles.input}
        value={activityName}
        onChangeText={setActivityName}
        placeholder="New Activity"
      />

      <Text variant="labelBg">Date (DD/MM/YYYY)</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder={date}
      />

      <Text variant="labelBg">Time</Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.input}
          value={hour}
          onChangeText={setHour}
          keyboardType="number-pad"
          placeholder="Hour (24h format)"
        />
        <TextInput
          style={styles.inputHideImLazyAndDontWantToFixThisNow}
          value={minute}
          onChangeText={setMinute}
          keyboardType="number-pad"
          placeholder="Minute"
        />
      </View>
    </View>
  );
};

const CreateSection = ({ onCreate }) => {
  return (
    <View style={styles.createSection}>
      <Button variant="sm" text="Create" color="gray" onPress={onCreate} />
    </View>
  );
};

const CreateActivity = () => {
  const currentDate = new Date();
  const formattedDate = `${currentDate
    .getDate()
    .toString()
    .padStart(2, "0")}/${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${currentDate.getFullYear()}`;
  const formattedTime = `${currentDate
    .getHours()
    .toString()
    .padStart(2, "0")}:${currentDate.getMinutes().toString().padStart(2, "0")}`;

  const [activityName, setActivityName] = useState("New Activity");
  const [date, setDate] = useState(formattedDate);
  const [hour, setHour] = useState(formattedTime.slice(0, 2));
  const [minute, setMinute] = useState(formattedTime.slice(3));

  const { activities, setActivities, invitedContacts, setInvitedContacts } = useContext(SurveyContext);
  const { socket } = useContext(SocketContext);
  const { authUser } = useContext(AuthContext);

  const navigation = useNavigation();

  const handleCreate = async () => {
    const startDateTime = `${date} ${hour}:${minute}`;
    let currentDate = new Date().toLocaleString();
    if (date !== "") {
      currentDate = startDateTime;
    }

    const data = {
        activityName,
        startDateTime: currentDate,
    };

    const response = await api.post('/activities', data);
    if(response.status === 201) {
        const newActivity = response.data.activity
        const updatedActivities = [...activities, newActivity];
        setActivities(updatedActivities);

        navigation.navigate('ActivityDashboard', { activityId: newActivity.id });
   
        const notification = {
           type: "invite",
           resourceId: newActivity.id,
           recipients: invitedContacts,
           senderId: authUser?.id
       }
   
       setInvitedContacts([])
   
       socket.emit('notification:send', notification)
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <HeaderSection />
      <MemberSection />
      <FormSection
        activityName={activityName}
        setActivityName={setActivityName}
        date={date}
        setDate={setDate}
        hour={hour}
        setHour={setHour}
        minute={minute}
        setMinute={setMinute}
      />
      <CreateSection onCreate={handleCreate} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 55,
  },
  titleContainer: {
    textAlign: "left",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    padding: 30,
    textAlign: "left",
  },
  memberSection: {
    justifyContent: "flex-start",
    marginLeft: 30,
  },
  memberContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "50%",
    padding: 20,
  },
  formSection: {
    width: "100%",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
    borderRadius: 10,
  },

  inputHideImLazyAndDontWantToFixThisNow: {
    width: "0%",
    height: 40,
    borderColor: "gray",
    marginBottom: 20,
  },
  headerSection: {
    flexDirection: "row", 
    marginLeft: 30,
    marginBottom: 35,
  },

  createSection: {
    alignSelf: "center",
  },
  inviteText: {
    marginLeft: 11,
  },
  addButton: {
    marginLeft: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F35F4B",
    marginLeft: 122,
    position: 'relative',
    zIndex: 20,
  },
  addButtonIcon: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff"
  },
  profileIcon: {
    marginLeft: 36,
    alignItems: "left"
  },
});

export default CreateActivity;