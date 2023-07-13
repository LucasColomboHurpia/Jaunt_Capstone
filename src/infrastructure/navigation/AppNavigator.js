import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import BottomTabNavigator from './BottomTabNavigator';
import PreferencesNavigator from './PreferencesNavigator';

const AppNavigator = () => {
    const [preferenceStatus, setPreferenceStatus] = useState(null);

    const stack = createStackNavigator();

    const checkPreferenceStatus = async () => {
        const result = await AsyncStorage.getItem('preference_status');
        console.log(result)
        setPreferenceStatus(result)
    }

    useEffect(() => {
        checkPreferenceStatus()
    }, [])

    return (
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

    )
}

export default AppNavigator;