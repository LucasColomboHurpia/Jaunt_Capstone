import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SurveyContext from '../../../../context/SurveyContext';
// Import question components
import Question1 from '../components/firstSurvey/Question1';
import Question2 from '../components/firstSurvey/Question2';
import Question3 from '../components/firstSurvey/Question3';
import Question4 from '../components/firstSurvey/Question4'
import api from '../../../../config/api';
// Array of question components
const questionsComponents = [Question1 , Question2, Question3];

const SurveyPage = ({ navigation }) => {
  const { preferences, setPreferences } = useContext(SurveyContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSurveyComplete, setSurveyComplete] = useState(false);
  let r = {}

  const handleAnswerOptionClick = async (answer, answerTitle, next=true) => {

    r = {...r, [answerTitle]: answer }
    
    if(next) setAnswers({ ...answers,...r });

    if (currentQuestion === questionsComponents.length - 1) {
      // Last question, submit survey
        const newPreferences = {
            ...answers,
            [`${answerTitle}`]: answer,
        }
        setPreferences(newPreferences);

        const response = await api.post('/preferences', newPreferences);
        // console.log(response.status.toString().includes('2'))
        // if(response.status.startsWtih('2')) {
            setSurveyComplete(true);
            await AsyncStorage.setItem('preference_status', 'true');
        // }
    } else {
      // Move to next question
      if(!next) return
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  

  useEffect(() => {
    if (isSurveyComplete) {
        navigation.navigate('BottomTab');
      }
  }, [isSurveyComplete])

  const CurrentQuestionComponent = questionsComponents[currentQuestion];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Text style={styles.questionCounter}>{`${currentQuestion + 1} of ${questionsComponents.length}`}</Text>
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
    backgroundColor: 'white'
  },
  bigText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  smallText: {
    fontSize: 20,
    marginBottom: 10,
  },
  gotohome: {
    position: 'absolute',
    bottom: 100,

  },

  questionCounter: {
    margin: 5,
    marginTop: 10,
    fontWeight: 'bold',

  }
});

export default SurveyPage;
