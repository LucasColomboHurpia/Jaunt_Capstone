import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import SurveyContext from '../context/SurveyContext';

// Import question components
import Question1 from '../components/firstSurvey/Question1';
import Question2 from '../components/firstSurvey/Question2';
import Question3 from '../components/firstSurvey/Question3';
// Array of question components
const questionsComponents = [Question1 , Question2, Question3];

const SurveyPage = ({ navigation }) => {
  const { surveyData, setSurveyData } = useContext(SurveyContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSurveyComplete, setSurveyComplete] = useState(false);

  const handleAnswerOptionClick = (answer) => {
    setAnswers({ ...answers, [`answer${currentQuestion + 1}`]: answer });

    if (currentQuestion === questionsComponents.length - 1) {
      // Last question, submit survey
      const newSurveyData = {
        ...surveyData,
        ...answers,
        [`answer${currentQuestion + 1}`]: answer,
      };
      setSurveyData(newSurveyData);
      console.log(newSurveyData);
      setSurveyComplete(true);
    } else {
      // Move to next question
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  

  if (isSurveyComplete) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
        <Text>All done!</Text>
        <Button title="Back to Login" onPress={() => navigation.navigate('LoginPage')} />
      </SafeAreaView>
    );
  }

  const CurrentQuestionComponent = questionsComponents[currentQuestion];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Text>{`${currentQuestion + 1} of ${questionsComponents.length}`}</Text>
      <CurrentQuestionComponent onAnswer={handleAnswerOptionClick} onGoBack={handlePreviousQuestion} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 55,
  },
});

export default SurveyPage;
