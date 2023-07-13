import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { ThemeProvider } from 'styled-components';

import AuthNavigator from './src/infrastructure/navigation/AuthNavigator';
import AppNavigator from './src/infrastructure/navigation/AppNavigator';
import SurveyContext from './src/context/SurveyContext';

import { theme } from './src/infrastructure/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
    const [token, setToken] = useState({});
    const [surveyData, setSurveyData] = useState({});
    const [activityParameters, setActivityParameters] = useState([]);
    const [currentActivityId, setCurrentActivityId] = useState([]);
    
    const getToken = async () => {
        await AsyncStorage.setItem('auth_token', 'keiks');
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
    <SurveyContext.Provider value={{ surveyData, setSurveyData, activityParameters, setActivityParameters,  currentActivityId, setCurrentActivityId }}>
        <ThemeProvider theme={theme}>
            <NavigationContainer>
                {token ? <AppNavigator /> : <AuthNavigator /> }
            </NavigationContainer>
        </ThemeProvider>
    </SurveyContext.Provider>
  );
};

export default App;
