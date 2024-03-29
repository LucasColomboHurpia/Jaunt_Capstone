import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import SurveyContext from '../../../../context/SurveyContext';

import ActivityQuestion1 from '../components/ActivitySurvey/ActivityQuestion1';
import ActivityQuestion2 from '../components/ActivitySurvey/ActivityQuestion2';
import ActivityQuestion3 from '../components/ActivitySurvey/ActivityQuestion3'; 
import api from '../../../../config/api';

const ActivitySurvey = ({ route, navigation }) => {
  const { currentActivity, setCurrentActivity} = useContext(SurveyContext);

  const [currentQuestion, setCurrentQuestion] = useState(1);


  const handleAnswer = (answer, questionKey) => {
    // Check if there are activities
    if (currentActivity) {
        // Update the specific activity with the new answer
        const activity = {
          ...currentActivity,
          [questionKey]: answer,
        };
  
        // Update the survey data in the context
        setCurrentActivity(activity);
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
  const handleSummaryNavigation = async () => {

    if(currentActivity) {
        navigation.navigate('ActivitySummary', { activityId: currentActivity.id });
    }
    else {
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
