import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView, StatusBar, Button } from 'react-native';
import SurveyContext from '../context/SurveyContext';

const HeaderSection = () => {
  return (
    <View style={styles.headerSection}>
      <Text style={styles.title}>Create an activity</Text>
    </View>
  );
};

const MemberSection = () => {
  return (
    <View style={styles.memberSection}>
      <Text style={styles.memberTitle}>Members</Text>
      <View style={styles.memberContent}>
        <Button title="Invite" color='grey'/>
        <View style={styles.memberCircles}>
          <View style={styles.circle} />
          <View style={styles.circle} />
          <View style={styles.circle} />
        </View>
      </View>
    </View>
  );
};


const FormSection = () => {
  const [activityName, setActivityName] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  return (
    <View style={styles.formSection}>
      <Text style={styles.inputTitle}>Activity Name</Text>
      <TextInput style={styles.input} value={activityName} onChangeText={setActivityName} />

      <Text style={styles.inputTitle}>Date (DD/MM/YYYY)</Text>
      <TextInput style={styles.input} value={date} onChangeText={setDate} />

      <Text style={styles.inputTitle}>Time</Text>
      <View style={{ flexDirection: 'row' }}>
        <TextInput style={styles.input} value={hour} onChangeText={setHour} keyboardType="number-pad" placeholder="" />
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
  const { surveyData } = useContext(SurveyContext);

  useEffect(() => {
    console.log('Survey Data: ', surveyData);
  }, []);

  const handleCreate = () => {
    // handle create button press
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <HeaderSection />
      <MemberSection />
      <FormSection />
      <CreateSection onCreate={handleCreate} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'flex-start',
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
  memberSection:{
    alignItems: 'center',
    justifyContent:'flex-start',
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
