import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { TouchableOpacity } from 'react-native';
import SurveyContext from '../../../../context/SurveyContext';

///-------------------------------------------------------------------------
const API_KEY = "";
/////-----------------------------------------------------------------------


const object1234 = `{ "ActivityParameters": { "dateTime": "2023-06-21, 3:49:34 a.m.", "name": "New Activity" },
  "UserWouldLikeTo": "Do Something",
  "Preferences": ["Art Gallery", "Restaurant", "Movie Theatre", "Shopping Mall", "Park", "Nightclub", "Art Gallery"],
  "Diet": "Vegetarian",
  "DoNotLike": ["Glutten", "Diary"],
  "DoLike": ["Fish", "Wine", "Bread"],
  "ChanceOfEnjoyingDrinking": 6.625 }`;

const exampleAPIresponse = `[{ "address": "750 Hornby St, Vancouver, BC V6Z 2H7", "coordinates": { "lat": 49.2835948, "lng": -123.121791 }, "name": "Vancouver Art Gallery", "description": "Experience world-class exhibits and contemporary art at the Vancouver Art Gallery 🎨🖼️", "Tips": [ "Take a leisurely stroll along Robson Street after your visit.", "Check out the gallery's rooftop patio for panoramic views of the city.", "Visit on a Tuesday evening for discounted admission and live music." ], "tags": [ "art", "cultural", "popular" ] }, 
{ "address": "English Bay Beach Path, Vancouver, BC V6G 1Z4", "coordinates": { "lat": 49.2894692, "lng": -123.1409033 }, "name": "English Bay Beach", "description": "Enjoy a relaxing day at English Bay Beach, one of Vancouver's most popular beaches 🏖️🌊", "Tips": [ "Bring a blanket and have a picnic on the sandy shores.", "Watch the beautiful sunset over the ocean.", "Take a walk along the Seawall to nearby Stanley Park." ], "tags": [ "beach", "outdoors", "relaxing" ] },
{ "address": "900 Burrard St, Vancouver, BC V6Z 1X9", "coordinates": { "lat": 49.2832496, "lng": -123.1227095 }, "name": "Scotiabank Theatre Vancouver", "description": "Watch the latest blockbuster movies at Scotiabank Theatre Vancouver 🍿🎥", "Tips": [ "Grab a combo deal for popcorn and a drink at the concession stand.", "Arrive early to secure your preferred seats.", "Check out the VIP cinema for a luxurious movie experience." ], "tags": [ "movies", "entertainment", "popular" ] }]`

const systemMessage = {
  "role": "system",
  "content": "You are a helpful assistant that suggests activities and places to go in Vancouver based on the given parameters. if the 'UserWouldLikeTo' is 'Do Something', sugest a real place to go, if if the 'UserWouldLikeTo' is 'Eat Something', suggest a real place to eat. The suggestions must always be given in a specific JavaScript array of objects format. For each suggestion, use this format(this is just an example, never use these example values, always use real place values): '[{address:' 123 example, vancouver, BC, zip code', coordinates: {lat:123,lng:123}, name: 'name of place', descriptiom: 'briefly describe the place, a short phrase, use emojis at the end',Tips:['suggestion of things to do around the area!','walk around and take a picture of this thing!','example'] ,tags:['example','expensive','healthy']},]'. The 'tags' should reflect the features of the location such as 'healthy', 'expensive', 'popular', etc. The tips should always be recomendations around the main area but never related to the main location, always at least 3 tips. The suggestions should consider the user's preferences, dietary restrictions, and likelihood of enjoying certain food types. The suggestions should be based on the user's 'UserWouldLikeTo', 'Preferences', 'Diet', 'DoNotLike', 'DoLike', and 'ChanceOfEnjoyingMeat' inputs. Always return the suggestions as JavaScript array of objects, not as plain text, do not add any more words in the explanation besides the array. keep your replies brief. generate at least 3 suggestions in one single object based on these parameters. The first characters of the message must be '[' and the last ']'"
};
const SurveyResults = ({ route, navigation }) => {
  const { surveyData, setSurveyData } = useContext(SurveyContext);
  const activityId = route.params.activityId;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [retryCount, setRetryCount] = useState(0);

  const makeApiCall = async () => {
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        { role: "user", content: JSON.stringify(surveyData) }
      ]
    };

    if (!API_KEY) {
      setIsLoading(true);
      console.log('no API key')
      setTimeout(() => {
        setData(JSON.parse(exampleAPIresponse));
        setIsLoading(false);
      }, 7000);
    } else {
      fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)
      })
        .then(response => response.json())
        .then(data => {
          console.log("CHATGPT CALL");
          console.log(data.choices[0].message.content);
          setData(JSON.parse(data.choices[0].message.content));
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error on API call:', error);
          if (retryCount < 2) {
            setRetryCount(retryCount + 1);
            makeApiCall();
          } else {
            setData([]);
            setIsLoading(false);
          }
        });
    }
  };

  useEffect(() => {
    makeApiCall();
  }, []);

  const handleOptionClick = (item) => {
    const updatedSurveyData = {
      ...surveyData,
      activityParameters: surveyData.activityParameters.map(param => {
        if (param.id === activityId) {
          return { ...param, apiResponse: item };
        }
        return param;
      })
    };

    setSurveyData(updatedSurveyData);

    console.log(surveyData)
    navigation.navigate('ActivityDashboard', { item, activityId });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Everyone has spoken!</Text>
      <Text style={styles.text}>These are the options:</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        data.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleOptionClick(item)}
          >
            <View style={styles.optionBox}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemText}>{item.address}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemTags}>Tags: {item.tags.join(', ')}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}

      <Text style={styles.boldText}>Choose wisely</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  boldText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    fontSize: 18,
  },
  optionBox: {
    backgroundColor: '#cccccc',
    borderRadius: 10,
    height: 'auto',
    width: '80%',
    marginVertical: 10,
    padding: 10,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  itemDescription: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
    marginBottom: 5,
  },
  itemTags: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    backgroundColor: '#eeeeee',
    borderRadius: 10,
    padding: 5,
  },
});

export default SurveyResults;