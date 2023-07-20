import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView, StatusBar, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SurveyContext from '../../../../context/SurveyContext';
import uuid from 'react-native-uuid';
import { useIsFocused } from "@react-navigation/native";
import { CommonActions } from '@react-navigation/native';
import SocketContext from '../../../../context/SocketContext';

const HeaderSection = () => {
  return (
    <View style={styles.headerSection}>
      <Text style={styles.title}>Create an activity</Text>
    </View>
  );
};

const MemberSection = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.memberSection}>
      <Text style={styles.memberTitle}>Members</Text>
      <View style={styles.memberContent}>
        <Button title="Invite" color='grey' onPress={() => navigation.navigate('ContactListScreen')} />
      </View>
    </View>
  );
};

const FormSection = ({ activityName, setActivityName, date, setDate, hour, setHour, minute, setMinute }) => {
  return (
    <View style={styles.formSection}>
      <Text style={styles.inputTitle}>Activity Name</Text>
      <TextInput style={styles.input} value={activityName} onChangeText={setActivityName} placeholder="New Activity" />

      <Text style={styles.inputTitle}>Date (DD/MM/YYYY)</Text>
      <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder={date} />

      <Text style={styles.inputTitle}>Time</Text>
      <View style={{ flexDirection: 'row' }}>
        <TextInput style={styles.input} value={hour} onChangeText={setHour} keyboardType="number-pad" placeholder="Hour (24h format)" />
        <TextInput style={styles.inputHideImLazyAndDontWantToFixThisNow} value={minute} onChangeText={setMinute} keyboardType="number-pad" placeholder="Minute" />
      </View>
    </View>
  );
};

const CreateSection = ({ onCreate }) => {
  return (
    <View style={styles.createSection}>
      <Button title="Create" color='gray' onPress={onCreate} />
    </View>
  );
};

const CreateActivity = () => {


  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
  const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;

  const [activityName, setActivityName] = useState("New Activity");
  const [date, setDate] = useState(formattedDate);
  const [hour, setHour] = useState(formattedTime.slice(0, 2));
  const [minute, setMinute] = useState(formattedTime.slice(3));

  const { surveyData, setSurveyData, invitedContacts, setInvitedContacts } = useContext(SurveyContext);
  const { socket } = useContext(SocketContext);

  const navigation = useNavigation();


  useEffect(() => {
    console.log('Survey Data: ', surveyData);
  }, []);

  useEffect(() => {
    console.log('create activity screen');
    console.log(invitedContacts);
  }, [invitedContacts]);

  useEffect(() => {
    console.log('Updated Activities: ', surveyData.activityParameters)
  }, [surveyData.activityParameters]);

  const handleCreate = () => {
    const dateTime = `${date} ${hour}:${minute}`;
    let currentDate = new Date().toLocaleString();
    if (date !== '') {
      currentDate = dateTime;
    }

    const newActivity = {
      id: uuid.v4(),
      name: activityName || 'New Activity',
      dateTime: currentDate,
      activitySet: false,
    };

    const updatedActivityParameters = surveyData.activityParameters ? [...surveyData.activityParameters, newActivity] : [newActivity];

    const updatedSurveyData = {
      ...surveyData,
      activityParameters: updatedActivityParameters,
    };

    setSurveyData(updatedSurveyData);

    console.log(surveyData)

    
     navigation.navigate('ActivityDashboard', { activityId: newActivity.id });

     const notification = {
        type: "invite",
        resourceId: "6494772f2c740f035fe3f039",
        recipients: invitedContacts,
        text: "Zarah sent you a new invite",
        sender: "64a4c7bda44bc3250281293d"
    }

    setInvitedContacts([])

    socket.emit('notification:send', notification)
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 55,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 30,
  },
  headerSection: {
    // styling for header section
  },
  memberSection: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  memberTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  memberContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '50%',
    padding: 20,
  },
  formSection: {
    width: '100%',
    padding: 20,
  },
  inputTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 20,
  },

  inputHideImLazyAndDontWantToFixThisNow: {
    width: '0%',
    height: 40,
    borderColor: 'gray',
    marginBottom: 20,
  },
  createSection: {
    // styling for create section
  },
});

export default CreateActivity;
