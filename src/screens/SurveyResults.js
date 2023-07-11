import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { TouchableOpacity } from 'react-native';
import SurveyContext from '../context/SurveyContext';

///-------------------------------------------------------------------------
const API_KEY = ""
/////-----------------------------------------------------------------------


const object1234 = `{ "ActivityParameters": { "dateTime": "2023-06-21, 3:49:34 a.m.", "name": "New Activity" },
  "UserWouldLikeTo": "Do Something",
  "Preferences": ["Art Gallery", "Restaurant", "Movie Theatre", "Shopping Mall", "Park", "Nightclub", "Art Gallery"],
  "Diet": "Vegetarian",
  "DoNotLike": ["Glutten", "Diary"],
  "DoLike": ["Fish", "Wine", "Bread"],
  "ChanceOfEnjoyingDrinking": 6.625 }`;

const exampleAPIresponse = `[{"address":"1687 W Mall, Vancouver, BC V6T 1Z4, Canada",
"coordinates":{"lat":49.2639243,"lng":-123.2489539},
"name":"Museum of Anthropology",
"description":"Explore indigenous art and culture 🎨",
"Tips":["Take a walk around the stunning UBC campus", "Visit the Nitobe Memorial Garden nearby for a tranquil experience", "Don't miss the impressive collection of First Nations artwork"],
"tags":["art", "culture", "indigenous"]},

{"address":"1715 Anderson St, Vancouver, BC V6H 3P2, Canada",
"coordinates":{"lat":49.2669501,"lng":-123.1467938},
"name":"Kitsilano Beach",
"description":"Relax on the sandy beach and enjoy stunning views 🏖️",
"Tips":["Take a dip in the ocean during the summer", "Rent a bike and explore the beautiful surrounding area", "Stay until sunset for breathtaking colors"],
"tags":["beach", "recreation", "scenic"]},

{"address":"695 Grand Blvd, North Vancouver, BC V7L 3W2, Canada",
"coordinates":{"lat":49.3142504,"lng":-123.081255},
"name":"Capilano Suspension Bridge Park",
"description":"Experience the thrill of crossing a suspension bridge 🌉",
"Tips":["Explore the Treetops Adventure for a unique perspective", "Visit during the holiday season for the Canyon Lights display", "Try the Cliffwalk for a bit of adrenaline"],
"tags":["adventure", "nature", "suspension bridge"]}]`

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