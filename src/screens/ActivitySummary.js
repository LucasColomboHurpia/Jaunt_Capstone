import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import SurveyContext from '../context/SurveyContext';

const ActivitySummary = ({ route, navigation }) => {
  const { activityId } = route.params; // Get the activityId from the route params
  const { surveyData } = useContext(SurveyContext);
  const { activityParameters } = surveyData;

  console.log('----summary---')
  console.log(activityId)
  console.log(surveyData)
  console.log(activityParameters)
  console.log('---')

  let currentActivity = surveyData?.activityParameters?.find(activity => activity.id === activityId); // Get the activity with the same id

  useEffect(() => {
    console.log("Survey results:");
    console.log(surveyData);
    console.log("Current activity: ");
    console.log(currentActivity);
  }, []);

  const handleNavigateToSurveyResults = () => {
    navigation.navigate('SurveyResults', { activityId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{currentActivity.name}</Text>
      <Text style={styles.subtitle}>You are close to setting your plan...</Text>
      <Text style={styles.data}>{JSON.stringify(surveyData, null, 2)}</Text>
      <Button
        title="yay!"
        color="gray"
        onPress={handleNavigateToSurveyResults}
      />
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
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  data: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ActivitySummary;