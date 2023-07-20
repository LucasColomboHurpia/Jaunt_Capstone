import React, { useRef, useContext, useState, useEffect } from 'react';
import { View, Animated } from 'react-native';
import { useTheme } from 'styled-components';

import Spacer from './Spacer';
import Text from './Text';

import { Easing } from 'react-native-reanimated';
import NotificationContext from '../context/NotificationContext';

const Alert = (props) => {
    const [] = useState('')
    const theme = useTheme();
    const opacity = useRef(new Animated.Value(0)).current;
    const top = useRef(new Animated.Value(0)).current;

    const { alertMessage, setShowAlert } = useContext(NotificationContext);

    Animated.timing(top, {
        toValue: 70,
        duration: 300,
        easing: Easing.in,
        useNativeDriver: false,
    }).start();

    Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.in,
        useNativeDriver: false,
    }).start();
    
    setTimeout(() => {
        Animated.timing(top, {
            toValue: 0,
            duration: 300,
            easing: Easing.in,
            useNativeDriver: false,
        }).start();

        Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            easing: Easing.in,
            useNativeDriver: false,
        }).start()
    }, 2000)

    useEffect(() => {
        return () => setShowAlert(false)
    }, [])

    return(
            <Animated.View style={{
                position: "absolute",
                top: top,
                width: "100%",
                backgroundColor: theme.colors.white,

                height: 58,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 100,
                opacity: opacity
            }}>
                <View style={{
                    backgroundColor: theme.colors.white,
                    elevation: 5,
                    opacity: 1,
                }}>
                    <Spacer type="padding" position="horizontal" customSize={40}>
                        <Spacer type="padding" position="vertical" customSize={16}>
                            <View style={{ position: "relative", width: "100%", height: "100%", justifyContent: "space-between", alignItems: "center" }}>
                            
                                <View style={{width: "100%", justifyContent: "center", alignItems: "center", flexDirection: "row", flex: 1 }}>
                                    <Text>{alertMessage}</Text>
                                </View>

                            </View>
                        </Spacer>
                    </Spacer>
                </View>
            </Animated.View>
    )
}

export default Alert;