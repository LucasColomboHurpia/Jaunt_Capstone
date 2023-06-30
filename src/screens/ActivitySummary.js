import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import SurveyContext from '../context/SurveyContext';

const ActivitySummary = ({ navigation }) => {
  const { surveyData } = useContext(SurveyContext);

  // Log the surveyData when the component mounts
  useEffect(() => {
    console.log("Survey results:");
    console.log(surveyData);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{surveyData.ActivityParameters.name}</Text>
      <Text style={styles.subtitle}>You are close to setting your plan...</Text>
      <Text style={styles.data}>{JSON.stringify(surveyData, null, 2)}</Text>
      <Button
        title="yay!"
        color="gray"
        style={styles.button}
        onPress={() => navigation.navigate('SurveyResults')}
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
  button: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  
});

export default ActivitySummary;
