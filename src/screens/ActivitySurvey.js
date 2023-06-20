import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Button } from 'react-native';
import SurveyContext from '../context/SurveyContext';
import ActivityQuestion1 from '../components/ActivitySurvey/ActivityQuestion1';
import ActivityQuestion2 from '../components/ActivitySurvey/ActivityQuestion2';

// Array of our survey components
const questions = [ActivityQuestion1, ActivityQuestion2];

const ActivitySurvey = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { surveyData, setSurveyData } = useContext(SurveyContext);

  const handleAnswer = (answer) => {
    // Save the answer in our context
    setSurveyData({
      ...surveyData,
      [`ActivityQuestion${currentQuestionIndex + 1}`]: answer,
    });

    // Go to the next question, or finish if this was the last question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigation.navigate('ActivitySummary');
    }
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
