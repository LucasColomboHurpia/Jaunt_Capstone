import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import SurveyContext from '../context/SurveyContext';
import MenuComponent from '../components/MenuComponent';

const ActivityDashboard = ({ route, navigation }) => {
  const { surveyData } = useContext(SurveyContext);
  const item = route.params || surveyData?.ActivityParameters || {};
  const surveyResults = Boolean(route.params);

  let addressText = 'Still figuring it out!'

  useEffect(() => {
    console.log('Survey Results: ', surveyResults);
  }, [surveyResults]);

  if (surveyResults) {
    console.log('survey done!');
    console.log('|ActivityParameters|', surveyData.ActivityParameters);
    console.log('|surveyResults|', item.item);

    addressText = item.item.address;
  } else {
    console.log('survey not done!')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{surveyData.ActivityParameters.name || 'New Activity!'}</Text>

      {/* no survey yet */}
      {!surveyResults && (
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.buttonCircle}
            onPress={() => navigation.navigate('ActivitySurvey')}
          >
            <Text style={styles.buttonText}>Pending...</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* survey completed */}
      {surveyResults && (
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.buttonCircle}>
            <Text style={styles.buttonText}>[icon]</Text>

            <Text style={styles.buttonText}>{item.item.name}</Text>
          </TouchableOpacity>
        </View>
      )}

      {surveyResults && (
        <View style={styles.buttonContainer}>
          <Button
            title="See Map"
            color='grey'
            onPress={() => navigation.navigate('MapPage', { item })}
          />
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.cardText}>Date: {surveyData.ActivityParameters.dateTime || 'Still figuring it out!'}</Text>
        <Text style={styles.cardText}>Location: {addressText}</Text>
      </View>
      <MenuComponent navigation={navigation} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    margin: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  buttonCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    height: 200,
    width: 200,
    borderRadius: 150,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  card: {
    marginTop: 20,
    padding: 35,
    backgroundColor: 'white',
    borderRadius: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  cardText: {
    fontSize: 18,
  },
});

export default ActivityDashboard;
