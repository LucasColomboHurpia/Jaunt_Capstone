import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LoginPage from './src/screens/LoginPage';
import SurveyPage from './src/screens/SurveyPage';
import CreateActivity from './src/screens/CreateActivity';


import SurveyContext from './src/context/SurveyContext';

const Stack = createStackNavigator();

const App = () => {
  const [surveyData, setSurveyData] = useState({});

  return (
    <SurveyContext.Provider value={{ surveyData, setSurveyData }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginPage" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="SurveyPage" component={SurveyPage} />
          <Stack.Screen name="CreateActivity" component={CreateActivity} />
        </Stack.Navigator>
      </NavigationContainer>
    </SurveyContext.Provider>
  );
};

export default App;
