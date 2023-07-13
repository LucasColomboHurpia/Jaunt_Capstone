import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./src/screens/LoginPage";
import SurveyPage from "./src/screens/SurveyPage";
import CreateActivity from "./src/screens/CreateActivity";
import ActivitySurvey from "./src/screens/ActivitySurvey";
import HomePage from "./src/screens/HomePage";
import MediaScreen from "./src/screens/Media";
import GroupPage from "./src/screens/GroupPage";
import Contact from "./src/screens/Contact";
import ActivitySummary from "./src/screens/ActivitySummary";
import SurveyResults from "./src/screens/SurveyResults";
import ActivityDashboard from "./src/screens/ActivityDashboard";
import MapPage from "./src/screens/MapPage";
import SurveyContext from "./src/context/SurveyContext";

const Stack = createStackNavigator();

const App = () => {
  const [surveyData, setSurveyData] = useState({});
  const [activityParameters, setActivityParameters] = useState([]);
  const [currentActivityId, setCurrentActivityId] = useState([]);

  return (
    <SurveyContext.Provider
      value={{
        surveyData,
        setSurveyData,
        activityParameters,
        setActivityParameters,
        currentActivityId,
        setCurrentActivityId,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginPage"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="SurveyPage" component={SurveyPage} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="Contact" component={Contact} />
          <Stack.Screen name="Media" component={MediaScreen} />
          <Stack.Screen name="CreateActivity" component={CreateActivity} />
          <Stack.Screen name="ActivitySurvey" component={ActivitySurvey} />
          <Stack.Screen name="GroupPage" component={GroupPage} />
          <Stack.Screen name="ActivitySummary" component={ActivitySummary} />
          <Stack.Screen name="SurveyResults" component={SurveyResults} />
          <Stack.Screen
            name="ActivityDashboard"
            component={ActivityDashboard}
          />
          <Stack.Screen name="MapPage" component={MapPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SurveyContext.Provider>
  );
};

export default App;
