import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from 'socket.io-client';

import PreferencesNavigator from './PreferencesNavigator';
import SocketContext from '../../context/SocketContext';
import NotificationContext from '../../context/NotificationContext';
import SurveyContext from '../../context/SurveyContext';
import { API_URL } from '../../config/constants';
import Alert from '../../shared-components/Alert';
import { getPreferences } from '../../services/preferences';

const AppNavigator = () => {
    const [preferences, setPreferences] = useState(null);
    const [activities, setActivities] = useState(null);

    const [surveyData, setSurveyData] = useState({});
    const [activityParameters, setActivityParameters] = useState([]);
    const [currentActivityId, setCurrentActivityId] = useState([]);
    const [invitedContacts, setInvitedContacts] = useState([]);
    const [registeredContacts, setRegisteredContacts] = useState([]);
    const [users, setUsers] = useState([]);   

    const [preferenceStatus, setPreferenceStatus] = useState(null);
    const [socket, setSocket] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [notifications, setNotifications] = useState('');
    const [showAlert, setShowAlert ] = useState(false);
    const stack = createStackNavigator();

    useEffect(() => {
        if(socket) {
            socket.on('notification:send', data => {
                setShowAlert(true)
                setAlertMessage(data.text)
                // setNotifications([...notifications, data])
            });
        }
    }, [socket])

    useEffect(() => {
        console.log(showAlert)
    }, [showAlert])
    

    const initializeSocket = async () => {
        try {
            const token = await AsyncStorage.getItem('auth_token');
            const socket = io(API_URL, {
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

    useEffect(() => {
        (async () => {
            const preferences = await getPreferences();
        })()
    })

    return (
        <SurveyContext.Provider value={{ preferences, setPreferences, surveyData, setSurveyData, activityParameters, setActivityParameters,  currentActivityId, setCurrentActivityId, invitedContacts, setInvitedContacts, registeredContacts, setRegisteredContacts, users, setUsers }}>
            <SocketContext.Provider value={{ socket, setSocket}}>
                <NotificationContext.Provider value={{ alertMessage, setAlertMessage, showAlert, setShowAlert, notifications, setNotifications}}>
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
        </SurveyContext.Provider>
    )
}

export default AppNavigator;