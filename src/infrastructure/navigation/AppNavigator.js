import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from 'socket.io-client';

import PreferencesNavigator from './PreferencesNavigator';
import SocketContext from '../../context/SocketContext';
import NotificationContext from '../../context/NotificationContext';
import { DEV_API_URL } from '../../config/constants';
import Alert from '../../shared-components/Alert';

const AppNavigator = () => {
    const [preferenceStatus, setPreferenceStatus] = useState(null);
    const [socket, setSocket] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert ] = useState(false);
    const stack = createStackNavigator();

    useEffect(() => {
        if(socket) {
            console.log('-============================================================')
            console.log('keis')
            console.log('-============================================================')
            socket.on('notification:send', data => {
                setShowAlert(true)
                setAlertMessage(data.text)
                console.log(data)
            })
        }
    }, [socket])

    const initializeSocket = async () => {
        try {
            const token = await AsyncStorage.getItem('auth_token');
            const socket = io(DEV_API_URL, {
                extraHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })
            setSocket(socket)
        } catch (error) {
            console.log(error)
        }
    }

    const checkPreferenceStatus = async () => {
        const result = await AsyncStorage.getItem('preference_status');
        setPreferenceStatus(result)
    }

    useEffect(() => {
        checkPreferenceStatus()
        initializeSocket()
    }, [])

    return (
        <SocketContext.Provider value={{ socket, setSocket}}>
            <NotificationContext.Provider value={{ alertMessage, setAlertMessage, showAlert, setShowAlert}}>
                {showAlert && <Alert />}
                
                <stack.Navigator 
                    screenOptions={{
                        headerShown: false,
                    }}
                    backBehavior="history"
                >
                    {/* { preferenceStatus ? 
                        <stack.Screen name="BottomTab" component={BottomTabNavigator} />
                    : 
                        <stack.Screen name="PreferencesNav" component={PreferencesNavigator} />
                    } */}

                    <stack.Screen name="PreferencesNav" component={PreferencesNavigator} />

                </stack.Navigator>
            </NotificationContext.Provider>
        </SocketContext.Provider>
    )
}

export default AppNavigator;