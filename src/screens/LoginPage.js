import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from '../config';


const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('obikaForPresident2022@gmail.com');
  const [password, setPassword] = useState('test1111');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginBtnDisabled, setLoginBtnDisabled] = useState(false);
  const [loginBtnText, setLoginBtnText] = useState("SUBMIT");    
  
    useEffect(() => {
        if(isLoading){
            setLoginBtnDisabled(true)
            setLoginBtnText("Loading...");
        }
        else {
            setLoginBtnDisabled(false);
            setLoginBtnText("SUBMIT");
        }
    }, [isLoading]);

    useEffect(() => {
        if(email && password){
            setLoginBtnDisabled(false)
        }
        else{
            setLoginBtnDisabled(true)
        }
    }, [email, password])

  const onChangeEmail = text => {
    setError('');
    setEmail(text);
  }

  const onChangePassword = text => {
    setError('');
    setPassword(text);
  }

  const submitForm = async () => {
    try {
        setIsLoading(true);
        const loginData = {
            email,
            password
        }
        
        const response = await axios.post(`${API_URL}/auth/login`, loginData);
        
        if(response.status === 200) {
            if(response.data.status === 'success') {
                const { token } = response.data;
                await AsyncStorage.setItem('auth_token', token);
                navigation.navigate('SurveyPage');
            }
        }
    } catch (error) {
        setIsLoading(false);
        if(error || error.response){
            return setError(error.response.data.message);
        }

        return setError('Something went wrong, please try again later!');
    }
  }

  const register = () => {
    console.log('Navigate to registration page');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jaunt</Text>

      <View style={styles.header}>
      </View>
      <Text style={styles.title}>Login Page</Text>
      <Text style={styles.error}>{error}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
      />
      <Button title={loginBtnText} disabled={loginBtnDisabled} onPress={submitForm} color="gray" />
      <TouchableOpacity onPress={register}>
        <Text style={styles.registerLink}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#ecf0f1',
  },
  header: {
    backgroundColor: '#cccccc',
    padding: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 10,
  },
  registerLink: {
    marginTop: 15,
    color: 'gray',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  error: {
    fontSize: 12,
    color: '#FF0000',
    marginBottom: 10,
    textAlign: 'center',
  }
});

export default LoginPage;
