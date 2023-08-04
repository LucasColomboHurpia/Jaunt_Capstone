import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { ThemeProvider } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { theme } from './src/infrastructure/theme';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigator from './src/infrastructure/navigation/AuthNavigator';
import AppNavigator from './src/infrastructure/navigation/AppNavigator';
import AuthContext from './src/context/AuthContext';
import api from './src/config/api';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
import NotificationSounds, { playSampleSound } from  'react-native-notification-sounds';

const App = () => {
    const [token, setToken] = useState({});
    const [authUser, setAuthUser] = useState(null);
    const getToken = async () => {
        const result = await AsyncStorage.getItem('auth_token');
        setToken(result)
    }

    useEffect(() => {
        getToken()
        NotificationSounds?.getNotifications('notification').then(soundsList  => {
            console.log('SOUNDS', JSON.stringify(soundsList));
            /*
            Play the notification sound.
            pass the complete sound object.
            This function can be used for playing the sample sound
            */
            playSampleSound(soundsList[1]);
            // if you want to stop any playing sound just call:
            // stopSampleSound();
        });
    
    }, [])

    useEffect(() => {
        (async () => {
            if(token) {
                try {
                    const response = await api.get('users/me');
                    const { user } = response.data;
                    setAuthUser(user);
                } catch (error) {
                    console.log(error)
                }
            }
        })()
    }, [token])

    const [loaded] = useFonts({
        'Neuzeit-Grotesk': require('./src/assets/fonts/NeuzeitSBook.ttf'),
    });

    if (!loaded) {
        return null;
    }

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
        <ThemeProvider theme={theme}>
            <NavigationContainer>
                {/* {token ? <AppNavigator /> : <AuthNavigator /> } */}
                <AuthNavigator />
            </NavigationContainer>
        </ThemeProvider>
    </AuthContext.Provider>
  );
};

export default App;
