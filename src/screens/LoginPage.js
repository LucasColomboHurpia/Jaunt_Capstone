import React, { useState } from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from '../config';


const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = async () => {
    try {
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
        console.log(error.response.data)        
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
      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder="Password"
        secureTextEntry
        autoCapitalize="none"
      />
      <Button title="Submit" onPress={submitForm} color="gray" />
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
});

export default LoginPage;
