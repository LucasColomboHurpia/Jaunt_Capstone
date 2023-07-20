import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { ThemeProvider } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { theme } from './src/infrastructure/theme';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './src/infrastructure/navigation/AuthNavigator';
import AppNavigator from './src/infrastructure/navigation/AppNavigator';
import SurveyContext from './src/context/SurveyContext';

const App = () => {
    const [token, setToken] = useState({});
    const [surveyData, setSurveyData] = useState({});
    const [activityParameters, setActivityParameters] = useState([]);
    const [currentActivityId, setCurrentActivityId] = useState([]);
    const [invitedContacts, setInvitedContacts] = useState([]);
    
    const getToken = async () => {
        const result = await AsyncStorage.getItem('auth_token');
        setToken(result)
    }

    useEffect(() => {
        getToken()
    }, [])

    const [loaded] = useFonts({
        'Neuzeit-Grotesk': require('./src/assets/fonts/NeuzeitSBook.ttf'),
    });

    if (!loaded) {
        return null;
    }

  return (
    <SurveyContext.Provider value={{ surveyData, setSurveyData, activityParameters, setActivityParameters,  currentActivityId, setCurrentActivityId, invitedContacts, setInvitedContacts }}>
        <ThemeProvider theme={theme}>
            <NavigationContainer>
                {token ? <AppNavigator /> : <AuthNavigator /> }
                {/* <AuthNavigator /> */}
            </NavigationContainer>
        </ThemeProvider>
    </SurveyContext.Provider>
  );
};

export default App;
