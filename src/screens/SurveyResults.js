import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { TouchableOpacity } from 'react-native';

  ///-------------------------------------------------------------------------
    const API_KEY = "";
  /////-----------------------------------------------------------------------


const object = `{ "ActivityParameters": { "dateTime": "2023-06-21, 3:49:34 a.m.", "name": "New Activity" },
  "UserWouldLikeTo": "Do Something",
  "Preferences": ["Art Gallery", "Restaurant", "Movie Theatre", "Shopping Mall", "Park", "Nightclub", "Art Gallery"],
  "Diet": "Vegetarian",
  "DoNotLike": ["Glutten", "Diary"],
  "DoLike": ["Fish", "Wine", "Bread"],
  "ChanceOfEnjoyingMeat": 6.625 }`;

const exampleAPIresponse = `[
  {
    "address":"1260 Howe St, Vancouver, BC V6Z 1R3",
    "coordinates": {"lat":49.2786918,"lng":-123.1252157},
    "name":"Vancouver Art Gallery",
    "description":"The Vancouver Art Gallery is a fosters awareness and understanding of contemporary and historical art with an emphasis on British Columbia, and provides education, research, and scholarship",
    "tags":["art", "museum", "gallery"]
},
{
    "address":"1661 Granville St, Vancouver, BC V6Z 1N3",
    "coordinates": {"lat":49.2729471,"lng":-123.1311157},
    "name":"Maru Korean Bistro",
    "description":"Maru Korean Bistro is a cozy restaurant serving authentic Korean cuisine, including vegetarian and vegan options.",
    "tags":["vegetarian", "restaurant","korean","affordable"]

},
{
    "address":"900 Burrard St, Vancouver, BC V6Z 3G5",
    "coordinates": {"lat":49.2827025,"lng":-123.1213828},
    "name":"Vancouver International Film Festival",
    "description":"The Vancouver International Film Festival is among the five largest film festivals in North America, screening films from more than 70 countries on nine screens.",
    "tags":["film", "festival", "movie theatre", "entertainment"]
}
]`

const systemMessage = {
  "role": "system",
  "content": "You are a helpful assistant that suggests activities and places to go based on the given parameters. if the 'UserWouldLikeTo' is 'Do Something', suugest a fun place to go, if if the 'UserWouldLikeTo' is 'Eat Something', suggest a place to eat. The suggestions must always be given in a specific JavaScript array of objects format. For each suggestion, use this format: '[{address:' 123 example street, vancouver, BC, zip code', coordinates: {123,123}, name: 'name of place', descriptiom: 'describe the place',tags:['healthy','expensive','popular']},]'. The 'tags' should reflect the features of the location such as 'healthy', 'expensive', 'popular', etc. The suggestions should consider the user's preferences, dietary restrictions, and likelihood of enjoying certain food types. The suggestions should be based on the user's 'UserWouldLikeTo', 'Preferences', 'Diet', 'DoNotLike', 'DoLike', and 'ChanceOfEnjoyingMeat' inputs. Always return the suggestions as JavaScript array of objects, not as plain text, do not add any more words in the explanation besides the array. generate at least 3 suggestions in one single object based on these parameters. The first characters of the message must be '[' and the last ']'"
};

const SurveyResults = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [retryCount, setRetryCount] = useState(0);

  const makeApiCall = () => {
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        { role: "user", content: object }
      ]
    };

    let amIWritingCodeAndWantToStopTheApi = false; // set this to true while coding

    if (amIWritingCodeAndWantToStopTheApi) { setIsLoading(false); }
    else {
      fetch("https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(apiRequestBody)
        })
        .then(response => response.json())
        .then(data => {
          console.log("CHATGPT CALL")
          console.log(data.choices[0].message.content)
          setData(JSON.parse(data.choices[0].message.content));
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error on api call:', error);
          if (retryCount < 2) {
            setRetryCount(retryCount + 1);
            makeApiCall();
          } else {
            setData(JSON.parse(exampleAPIresponse));
            setIsLoading(false);
          }
        });
    }
  };

  useEffect(() => {
    makeApiCall();
  }, [retryCount]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Everyone has spoken!</Text>
      <Text style={styles.text}>These are the options:</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        data.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate('ActivityDashboard', { item })}>
          <View style={styles.optionBox}>
            <Text style={styles.itemName}> {item.name}</Text>
            <Text style={styles.itemText}> {item.address}</Text>
            <Text style={styles.itemDescription}> {item.description}</Text>
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
    fontSize: 14,
    color: '#666',
    marginTop: 5,
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
