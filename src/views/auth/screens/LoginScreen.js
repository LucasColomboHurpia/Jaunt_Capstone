import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from 'styled-components';
import { SvgXml } from 'react-native-svg';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import api from '../../../config/api';
import Text from '../../../shared-components/Text';
import Button from '../../../shared-components/Button';
import { Input } from '../../../shared-components/Form';
import Spacer from '../../../shared-components/Spacer';
import logo from '../../../assets/icons/logo';
import googleIcon from '../../../assets/icons/googleIcon';
import { Container } from '../../../shared-components/Container';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('obikaForPresident2022@gmail.com');
  const [password, setPassword] = useState('test1111');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginBtnDisabled, setLoginBtnDisabled] = useState(false);
  const [loginBtnText, setLoginBtnText] = useState("Sign in");  
  
  const theme = useTheme();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '291519119551-6vsdvantt8h3gpcieuua468aj9jqifft.apps.googleusercontent.com',
    androidClientId: '291519119551-qgs2kutlbf7bkdnqk7vveelqbpb8mv8c.apps.googleusercontent.com',
  },{
    projectNameForProxy: "@obikakelvin/jaunt"
  })
  
    useEffect(() => {
        if(isLoading){
            setLoginBtnDisabled(true)
            setLoginBtnText("Loading...");
        }
        else {
            setLoginBtnDisabled(false);
            setLoginBtnText("Sign in");
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

    useEffect(() => {
        handleGoogleSignIn(response?.authentication?.accessToken)
    }, [response])

  const onChangeEmail = text => {
    setError('');
    setEmail(text);
  }

  const onChangePassword = text => {
    setError('');
    setPassword(text);
  }

  const handleSignInSuccess = async (response) => {
    if(response.status === 200) {
        if(response.data.status === 'success') {
            const { token } = response.data;
            await AsyncStorage.setItem('auth_token', token);
            navigation.navigate('App');
        }
    }
}

  const submitForm = async () => {
    const loginData = {
        email,
        password
    }

    try {
        setIsLoading(true);
        const response = await api.post(`/auth/login`, loginData);
        handleSignInSuccess(response);
        
    } catch (error) {
        setIsLoading(false);
        if(error && error.response){
            return setError(error.response.data.message);
        }

        return setError('Something went wrong, please try again later!');
    }
  }

  const handleGoogleSignIn = async (token) => {
    if(response?.type === "success") {
        const response = await axios.get("https://www.googleapis.com/userinfo/v2/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const googleUser = response.data;

        const r = await api.post('auth/signInWithGoogle', {
            googleUser
        })

        handleSignInSuccess(r);
    }
    
    // const data = user.email
  }

  const signIn = async (data) => {
    
  }

  const register = () => {
    console.log('Navigate to registration page');
  }

  return (
    <Container>
        <Spacer type="margin" position="bottom" customSize={20} >
            <Aligner>
                <SvgXml xml={logo()} />
            </Aligner>
        </Spacer>
      
      <Spacer type="margin" position="bottom" customSize={20} >
        <Aligner>
            <Text variant="heading1">Sign in</Text>
        </Aligner>
      </Spacer>

      <TouchableOpacity style={styles.header} onPress={() => promptAsync({projectNameForProxy: "@obikakelvin/jaunt"})}>
        <Spacer type="margin" position="right" customSize={20} >
            <SvgXml xml={googleIcon()} />
        </Spacer>
        
        <Text variant="labelMd" options={{ color: theme.colors.greys.g2 }}>Sign in with Google</Text>
      </TouchableOpacity>

      <Spacer>
            <Text variant="heading2">Or enter your login credentials</Text>
      </Spacer>

      <Text style={styles.error}>{error}</Text>
      
        <Spacer type="margin" position="bottom" customSize={30}>
            <Text variant="labelSm">EMAIL ADDRESS</Text>
            
            <Spacer type="margin" position="bottom" customSize={5} />
            
            <Input
                onChangeText={onChangeEmail}
                value={email}
                type="email"
                placeholder="email@gmail.com"
                autoCapitalize="none"
            />
        </Spacer>

        <Spacer type="margin" position="bottom" customSize={20}>
            <Text variant="labelSm">PASSWORD</Text>
            
            <Spacer type="margin" position="bottom" customSize={5} />
            
            <Input
                onChangeText={onChangePassword}
                value={password}
                type="password"
                placeholder="Enter your password here"
                secureTextEntry
                autoCapitalize="none"
            />
        </Spacer>
      
        <Spacer type="margin" position="bottom" customSize={20} >

            <Button variant="bg"
                text={loginBtnText}
                type="secondary"
                disabled={loginBtnDisabled}
                onPress={submitForm}
            />

        </Spacer>

      <Aligner>
        <TouchableOpacity onPress={register}>
            <Text variant="body" options={{ textDecoration: "underline" }}>No account yet? Sign up here</Text>
        </TouchableOpacity>
      </Aligner>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 20,
    borderRadius: 2,
    height: 50,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
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

export default LoginScreen;
