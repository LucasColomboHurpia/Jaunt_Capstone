import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import SurveyContext from '../context/SurveyContext';

// Import question components
import Question1 from '../components/firstSurvey/Question1';
import Question2 from '../components/firstSurvey/Question2';
import Question3 from '../components/firstSurvey/Question3';
import Question4 from '../components/firstSurvey/Question4'
// Array of question components
const questionsComponents = [Question1 , Question2, Question3, Question4];

const SurveyPage = ({ navigation }) => {
  const { surveyData, setSurveyData } = useContext(SurveyContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSurveyComplete, setSurveyComplete] = useState(false);

  const handleAnswerOptionClick = (answer,answerTitle) => {
    setAnswers({ ...answers, [`${answerTitle}`]: answer });

    if (currentQuestion === questionsComponents.length - 1) {
      // Last question, submit survey
      const newSurveyData = {
        ...surveyData,
        ...answers,
        [`${answerTitle}`]: answer,
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
        <Text style={styles.bigText}>You're all set</Text>
        <Text style={styles.smallText}>Start First Activity</Text>
        <Button title="Start Activity" color="gray" onPress={() => navigation.navigate('CreateActivity')} />
        <View style={styles.gotohome}>
          <Button title="Go to Home" color="gray" onPress={() => navigation.navigate('HomePage')} />
        </View>
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
  bigText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  smallText: {
    fontSize: 20,
    marginBottom: 20,
  },
  gotohome: {
    position: 'absolute',
    bottom: 100,

  },
});

export default SurveyPage;
