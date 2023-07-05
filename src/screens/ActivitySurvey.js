import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button } from 'react-native';
import SurveyContext from '../context/SurveyContext';
import ActivityQuestion1 from '../components/ActivitySurvey/ActivityQuestion1';
import ActivityQuestion2 from '../components/ActivitySurvey/ActivityQuestion2';
import ActivityQuestion3 from '../components/ActivitySurvey/ActivityQuestion3';

// Array of our survey components
const questions = [ActivityQuestion1, ActivityQuestion2, ActivityQuestion3];

const ActivitySurvey = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { setSurveyData } = useContext(SurveyContext);

  const handleAnswer = (answer, answerTitle) => {
    // Save the answer in our context
    setSurveyData((prevResults) => {
      const newResults = { ...prevResults, [`${answerTitle}`]: answer };

      // Go to the next question, or finish if this was the last question
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        console.log("Survey complete! Here's the results:");
      
        console.log(newResults);
        navigation.navigate('ActivitySummary'); // Navigate to ActivitySummary after the survey is done
      }

      return newResults;
    });
  };

  // Render the current question
  const CurrentQuestion = questions[currentQuestionIndex];
  return (
    <SafeAreaView style={styles.container}>
      <CurrentQuestion onAnswer={handleAnswer} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ActivitySurvey;
