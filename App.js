import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from './src/screens/LoginPage';
import SurveyPage from './src/screens/SurveyPage';
import CreateActivity from './src/screens/CreateActivity';
import ActivitySurvey from './src/screens/ActivitySurvey';
import HomePage from './src/screens/HomePage'
import GroupPage from './src/screens/GroupPage';
import ActivitySummary from './src/screens/ActivitySummary';
import SurveyResults from './src/screens/SurveyResults';
import ActivityDashboard from './src/screens/ActivityDashboard';
import MapPage from './src/screens/MapPage'

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
          <Stack.Screen name="HomePage" component={HomePage}/>
          <Stack.Screen name="CreateActivity" component={CreateActivity} />
          <Stack.Screen name="ActivitySurvey" component={ActivitySurvey} />
          <Stack.Screen name="GroupPage" component={GroupPage} />
          <Stack.Screen name="ActivitySummary" component={ActivitySummary} />
          <Stack.Screen name="SurveyResults" component={SurveyResults} />
          <Stack.Screen name="ActivityDashboard" component={ActivityDashboard} />
          <Stack.Screen name="MapPage" component={MapPage} />

        </Stack.Navigator>
      </NavigationContainer>
    </SurveyContext.Provider>
  );
};

export default App;
