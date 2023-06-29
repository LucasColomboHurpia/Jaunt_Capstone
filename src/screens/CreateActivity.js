import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView, StatusBar, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SurveyContext from '../context/SurveyContext';

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
        <Button title="Invite" color='grey' onPress={() => navigation.navigate('Contact')} />
        <View style={styles.memberCircles}>
          <View style={styles.circle} />
          <View style={styles.circle} />
          <View style={styles.circle} />
        </View>
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
        <TextInput style={styles.input} value={minute} onChangeText={setMinute} keyboardType="number-pad" placeholder="Minute" />
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

const CreateActivity = ({ navigation }) => {
  const currentDate = new Date();

  // Format the date as "DD/MM/YYYY"
  const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;

  // Format the time as "HH:MM"
  const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;

  const [activityName, setActivityName] = useState("New Activity");
  const [date, setDate] = useState(formattedDate);
  const [hour, setHour] = useState(formattedTime.slice(0,2)); // First two characters represent the hour
  const [minute, setMinute] = useState(formattedTime.slice(3)); // Last two characters represent the minutes

  const { surveyData, setSurveyData } = useContext(SurveyContext);

  useEffect(() => {
    console.log('Survey Data: ', surveyData);
  }, []);

  const handleCreate = () => {
    const dateTime = `${date} ${hour}:${minute}`;

    let currentDate = new Date().toLocaleString();

    if(date!==''){currentDate=dateTime}


    const newActivity = {
      name: activityName || 'New Activity',
      dateTime: currentDate,
    };

    // Update surveyData with activityParameters
    setSurveyData(prevData => ({
      ...prevData,
      ActivityParameters: newActivity,
    }));

    console.log(surveyData)

    // Navigate to ActivitySurvey after setting data
    navigation.navigate('ActivitySurvey');
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
    padding: 30
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
    padding: 20
  },
  memberCircles: {
    flexDirection: 'row',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'grey',
    marginLeft: -10,
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
  createSection: {
    // styling for create section
  },
});

export default CreateActivity;





