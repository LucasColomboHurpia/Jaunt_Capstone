import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import SurveyContext from '../../../../context/SurveyContext';

import ActivityQuestion1 from '../components/ActivitySurvey/ActivityQuestion1';
import ActivityQuestion2 from '../components/ActivitySurvey/ActivityQuestion2';
import ActivityQuestion3 from '../components/ActivitySurvey/ActivityQuestion3'; 

const ActivitySurvey = ({ route, navigation }) => {
  const { currentActivity, setCurrentActivity, activities, setActivities} = useContext(SurveyContext);

  const [currentQuestion, setCurrentQuestion] = useState(1);


  const handleAnswer = (answer, questionKey) => {
    // Check if there are activities
    if (currentActivity) {
      // Merge the new answer with the existing activities
      const updatedActivities = [ ...activities ];
  
      // Find the activity with a matching ID
      const activityIndex = updatedActivities.findIndex((activity) => {
        return activity.id === route.params?.activityId
      });
  
      if (activityIndex !== -1) {
        // Update the specific activity with the new answer
        updatedActivities[activityIndex] = {
          ...updatedActivities[activityIndex],
          [questionKey]: answer,
        };
  
        // Update the survey data in the context
        setActivities(updatedActivities);
      } else {
        // Activity not found, create a new activity object with the new answer
        const newActivity = {
          id: route.params?.activityId,
          [questionKey]: answer,
        };
  
        // Add the new activity to the existing activityParameters array
        updatedActivities.push(newActivity);
  
        // Update the survey data in the context
        setActivities(updatedActivities);
      }
    } else {
      // Create a new activityParameters array with the current activity and its answer
      const newActivityParameters = [
        {
          id: route.params?.activityId,
          [questionKey]: answer,
        },
      ];
  
      // Update the survey data in the context with the new activityParameters
      setActivities(newActivityParameters)
    }
  
    // Move to the next question
    setCurrentQuestion((prevQuestion, index) => {
            return prevQuestion + 1
    });
  };

  useEffect(() => {
    if(currentQuestion > 3) {
        handleSummaryNavigation();
    }
  }, [currentQuestion])
  



  const handleGoBack = () => {
    // Move to the previous question
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  // Handle navigation to the ActivitySummary page
  const handleSummaryNavigation = () => {

    const activityId = route.params?.activityId;
    const activity = activities?.find((activity) => activity.id === activityId);
  
    if (activityId) {
      navigation.navigate('ActivitySummary', { activityId });
    } else {
      // Handle the case when activity is not found
      console.log('Activity not found');
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      {currentQuestion === 1 && <ActivityQuestion1 onAnswer={handleAnswer} />}
      {currentQuestion === 2 && <ActivityQuestion2 onAnswer={handleAnswer} onGoBack={handleGoBack} />}
      {currentQuestion === 3 && <ActivityQuestion3 onAnswer={handleAnswer} onGoBack={handleGoBack} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',

  },
});

export default ActivitySurvey;
