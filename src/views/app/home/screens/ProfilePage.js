import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SurveyContext from '../../../../context/SurveyContext';
import AuthContext from '../../../../context/AuthContext';

import { BackIcon, CameraPlusIcon } from '../../../../assets/icons/Icon'
import { Image } from 'react-native';

const Profile = ({ navigation }) => {
  const surveyData = useContext(SurveyContext);
  const { authUser } = useContext(AuthContext);

  const diet = surveyData.surveyData?.Diet || "None";
  const likes = surveyData.surveyData?.DoLike?.join(", ") || "None";
  const dislikes = surveyData.surveyData?.DoNotLike?.join(", ") || "None";

  return (
    <View style={styles.container}>

    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <BackIcon />
      </TouchableOpacity>
      <Text style={styles.title}>Profile</Text>
    </View>

    <View style={styles.userSection}>
      <View style={styles.avatar}>
        <Image style={{ width: 100, height: 100, borderRadius: 100 }} source={{ uri: `${authUser?.picture}`}} />
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{authUser?.name}</Text>
        <Text style={styles.userDetails}>{authUser?.email}</Text>
      </View>
    </View>

      <Text style={styles.subTitle}>Preferences</Text>

      <Text style={styles.prefereceTitle}>Diet</Text>
      <Text style={styles.prefereceText}>{diet}</Text>

      <Text style={styles.prefereceTitle}>Things I like</Text>
      <Text style={styles.prefereceText}>{likes}</Text>

      <Text style={styles.prefereceTitle}>Alergies / Things I don't like</Text>
      <Text style={styles.prefereceText}>{dislikes}</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('UpdatePreferences')}
      >
        <Text style={styles.buttonText}>Update Preferences</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Logout')}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    width: "100%",
    padding: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 50,
    marginTop: 8,
  },

  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 125,
    backgroundColor: '#E5E4E2',
    marginRight: 20,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60, 
    backgroundColor: '#E5E4E2',
    marginRight: 20,
    justifyContent: 'center', 
    alignItems: 'center', 
  },

  userInfo: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
  },
  userDetails: {
    fontSize: 13,
    color: 'grey',

  },
  subTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },

  prefereceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  prefereceText: {
    fontSize: 16,
    marginBottom: 10,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#F35F4B',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#F35F4B',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Profile;
