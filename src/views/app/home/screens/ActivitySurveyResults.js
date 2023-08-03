import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { TouchableOpacity } from 'react-native';
import SurveyContext from '../../../../context/SurveyContext';

import { CommonActions, useIsFocused } from "@react-navigation/native";

import { SettingsIcon, PizzaWhite, SunIcon, } from '../../../../assets/icons/Icon'

import { BeefIcon, SushiBlack, ItalianIcon, PicnicIcon, SeafoodIcon, BurguerBlack, PizzaBlack, OrientalIcon, MexicanIcon, VegetablesIcon } from '../../../../assets/icons/Icon'
import { DoIcon, BowlingIcon, PopcornIcon, BeachIcon, BridgeIcon, HikingIcon, SpinningGlobeBlack, BeerBlack, MuseumIcon, GalleryIcon, AmusementParkIcon, KarokeIcon, ArcadeIcon, BoulderingIcon } from '../../../../assets/icons/Icon'
import api from '../../../../config/api';

const EatSomethingIcons = [
  { keyword: 'Steakhouse', icon: BeefIcon },
  { keyword: 'Sushi', icon: SushiBlack },
  { keyword: 'Italian', icon: ItalianIcon },
  { keyword: 'Picnic', icon: PicnicIcon },
  { keyword: 'Seafood', icon: SeafoodIcon },
  { keyword: 'Fast Foot', icon: BurguerBlack },
  { keyword: 'Pizza', icon: PizzaBlack },
  { keyword: 'Oriental', icon: OrientalIcon },
  { keyword: 'Mexican', icon: MexicanIcon },
  { keyword: 'Vegetarian', icon: VegetablesIcon }
]

const DoSomethingIcons = [
  { keyword: 'Bowling', icon: BowlingIcon },
  { keyword: 'MovieTheater', icon: PopcornIcon },
  { keyword: 'Beach', icon: BeachIcon },
  { keyword: 'Park', icon: BridgeIcon },
  { keyword: 'Hiking', icon: HikingIcon },
  { keyword: 'Nightclub', icon: SpinningGlobeBlack },
  { keyword: 'Bar', icon: BeerBlack },
  { keyword: 'Museum', icon: MuseumIcon },
  { keyword: 'Gallery', icon: GalleryIcon },
  { keyword: 'AmusementPark', icon: AmusementParkIcon },
  { keyword: 'Karaoke', icon: KarokeIcon },
  { keyword: 'Arcade', icon: ArcadeIcon }
]

///-------------------------------------------------------------------------
const API_KEY = ""
/////-----------------------------------------------------------------------




const object1234 = `{ "ActivityParameters": { "startDateTime": "2023-06-21, 3:49:34 a.m.", "name": "New Activity" },
  "userWouldLikeTo": "Do Something",
  "Preferences": ["Art Gallery", "Restaurant", "Movie Theatre", "Shopping Mall", "Park", "Nightclub", "Art Gallery"],
  "Diet": "Vegetarian",
  "DoNotLike": ["Glutten", "Diary"],
  "DoLike": ["Fish", "Wine", "Bread"],
  "ChanceOfEnjoyingDrinking": 6.625 }`;

const exampleAPIresponse = ` [{"address":"1269 Hamilton St, Vancouver, BC V6B 6K3, Canada","coordinates":{"lat":49.275399,"lng":-123.122460},"name":"Pizzeria Ludica","description":"Board game themed pizzeria 🍕🎲","Tips":["Enjoy a delicious slice of pizza while playing one of the many board games available","Try their 'Game of Thrones' specialty pizza","Take a walk to Yaletown Park afterwards"],"tags":["Pizza"],"activityIcon":"Pizza"},{"address":"345 Robson St, Vancouver, BC V6B 2B1, Canada","coordinates":{"lat":49.279702,"lng":-123.117227},"name":"Art Gallery","description":"Contemporary art gallery 🖼️","Tips":["Explore the diverse collection of contemporary art","Visit during one of the free admission days","Grab a bite to eat at a nearby restaurant"],"tags":["Art Gallery"],"activityIcon":"Gallery"},{"address":"1000 Mainland St, Vancouver, BC 
V6B 2T4, Canada","coordinates":{"lat":49.276001,"lng":-123.119292},"name":"Sushi Maro","description":"Sushi restaurant with a modern twist 🍣","Tips":["Try their specialty rolls like the 'Dragon Roll' or 'Volcano Roll'","Sit at the sushi bar for a more interactive dining experience","Take a stroll around David Lam Park afterwards"],"tags":["Sushi"],"activityIcon":"Sushi"}]`

const systemMessage = {
  "role": "system",
  "content": `You are a helpful assistant that suggests activities and real places to go in Vancouver based on the given parameters. you are not allowed to show places that are not real business. if the 'userWouldLikeTo' is 'do something', if the 'userWouldLikeTo' is 'eat something', suggest a real place to eat. The suggestions must always be given in a specific JavaScript array of objects format. For each suggestion, use this format(never use these example values, always use real place values, do not invent places, prioritize business): '[{address:' add the address here', coordinates: {lat:123,lng:123}, name: 'name of place', description: 'briefly describe the place, a short phrase, use emojis at the end',Tips:['suggestion of things to do around the area!','walk around and take a picture of this thing!','example'] ,tags:['example','expensive','healthy'], activityIcon:'Category'},]'. The 'tags' should reflect the features of the location such as 'healthy', 'expensive', 'popular', etc. The tips should always be recomendations around the main area but never related to the main location, always at least 3 tips. The suggestions should consider the user's preferences, dietary restrictions, and likelihood of enjoying certain food types. The suggestions should be based on the user's 'userWouldLikeTo', 'preferences', 'dietType', 'foodDishes', 'allergies', 'medicalConditions', and 'chanceOfEnjoyingMeat' inputs. Always return the suggestions as JavaScript array of objects, not as plain text, do not add any more words in the explanation besides the array. if userWouldLikeTo is "eat something", the "activityIcon" field must be one of these categories, matching as much as possible to the suggestion: "Steakhouse, Sushi, Italian, Picnic, Seafood, Fast Foot, Pizza, Oriental, Mexican, Vegetarian", and if it is "DoSomething" match the suggestion with one of these: "Bowling, MovieTheater, Beach, Park, Hiking, Bightclub, Bar, Museum, Gallery, AmusementPark, Karaoke, Arcade, Bouldering". keep your replies brief. generate at least 3 suggestions in one single object based on these parameters. The first characters of the message must be '[' and the last ']'`
};

const SurveyResults = ({ route, navigation }) => {
  ///==============Hide menu bar=================================================================
  const isFocused = useIsFocused();
  useEffect(() => {
    if (navigation) {
      navigation.getParent().dispatch(state => {
        return CommonActions.reset({
          ...state,
          hidden: true,
        });
      })
      return () => navigation.getParent().dispatch(state => {
        return CommonActions.reset({
          ...state,
          hidden: false,
        });
      });
    }
  }, [isFocused]);
  ///===============================================================================
  const { setCurrentActivity, currentActivity, preferences } = useContext(SurveyContext);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [retryCount, setRetryCount] = useState(0);

  const [selectedItem, setSelectedItem] = useState(null);

  ///===============================================================================
  const API_KEY2 = "030a06ef3a21f98e9fad039e0133fbbe";

  const [weatherDesc, setweatherDesc] = useState('Loading Weather Data...');
  const [weatherTemp, setweatherTemp] = useState('');
  const [weatherTempHI, setweatherTempHI] = useState('');
  const [weatherTempLO, setweatherTempLO] = useState('');

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Vancouver&appid=${API_KEY2}`
      );
      const data = await response.json();

      let currentTemperature = `${(data.main.temp - 273.15).toFixed(0)}º`;
      let currentTemperatureHi = `Hi: ${(data.main.temp_max - 273.15).toFixed(0)}º`;
      let currentTemperatureLo = `Lo: ${(data.main.temp_min - 273.15).toFixed(0)}º`;

      setweatherDesc(data.weather[0].description);
      setweatherTempHI(currentTemperatureHi);
      setweatherTempLO(currentTemperatureLo);
      setweatherTemp(currentTemperature);

    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  ///===============================================================================


  //maybe add a limit here?
  const handleRetry = () => {
    setIsLoading(true);
    makeApiCall();
  };


  const makeApiCall = async () => {

    setSelectedItem(null);
    fetchWeatherData();

    const data = {...preferences, currentActivity}

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        { role: "user", content: JSON.stringify(data) }
      ]
    };

    if (!API_KEY) {
      setIsLoading(true);
      setTimeout(() => {
        const sanitized = exampleAPIresponse.replace(/[\u0000-\u001f]/g, '');
        const parsed = JSON.parse(sanitized);
        setData(parsed);
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

          // Check if data.choices[0].message.content contains any of the specified strings
          if (
            data.choices[0].message.content.includes("123 ") ||
            data.choices[0].message.content.includes("456") ||
            data.choices[0].message.content.includes("example")
          ) {
            // Retry the API call
            if (retryCount < 2) {
              setRetryCount(retryCount + 1);
              makeApiCall();
            } else {
              setData([]);
              setIsLoading(false);
            }
          } else {
            setData(JSON.parse(data.choices[0].message.content));
            setIsLoading(false);
          }
        })
        .catch(error => {
          console.error('Error on API call:', error);
          // On catch, regardless of error type, increase retryCount and retry
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

  const handleOptionClick = async (item, index) => {
    if (selectedItem !== index) {
      setSelectedItem(index);
    } else {
        const updatedActivity = { ...currentActivity, ...item, eventName: item.name, status: "upcoming" };
        const activityId = currentActivity.id; 
        setCurrentActivity(updatedActivity);
        const response = await api.patch(`/activities/${activityId}`, { ...updatedActivity });
    
        if(response.status === 200) {
            setCurrentActivity(response.data.activity)
            navigation.navigate('ActivityDashboard', { item, activityId });
        }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.activityName}>{currentActivity?.name}</Text>

      <View style={styles.infoCard}>
        <View style={styles.iconWrapperWeather}>
          <View style={styles.iconContainerWeather}>
            <SunIcon size={50} />
          </View>
        </View>
        <View style={styles.infoTextWrapper}>
          <Text style={styles.infoTextBold}>{currentActivity?.startDateTime}</Text>
          <Text style={styles.infoTextGrey}>{weatherDesc}, {weatherTemp}</Text>
        </View>
      </View>

      <Text style={styles.text}>Everyone has spoken!</Text>
      <Text style={styles.title}>These are the options:</Text>



      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.contentWrapper}>
            {data.map((item, index) => {
              // Search for the icon in both arrays
              const eatIconObject = EatSomethingIcons.find(iconObj => iconObj.keyword === item.activityIcon);
              const doIconObject = DoSomethingIcons.find(iconObj => iconObj.keyword === item.activityIcon);

              // If an icon was found in the eat array, use it. If not, check the do array. If still not found, use a default icon.
              let IconComponent = DoIcon;
              if (eatIconObject) {
                IconComponent = eatIconObject.icon;
              } else if (doIconObject) {
                IconComponent = doIconObject.icon;
              }

              // Define the color and size for the icon
              const iconColor = '#19445a';  // Replace with your preferred color
              const iconSize = 70;  // Replace with your preferred size

              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleOptionClick(item, index)}
                >
                  <View style={[
                    styles.optionBox,
                    selectedItem === index && styles.selectedOption
                  ]}>
                    <View style={styles.iconWrapper}>
                      <View style={styles.iconContainer}>
                        <IconComponent color={iconColor} size={iconSize} />
                      </View>
                    </View>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemText}>{item.address}</Text>
                    {selectedItem === index && (
                      <>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                        <Text style={styles.itemTags}>Tags: {item.tags.join(', ')}</Text>
                      </>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })

            }
            {!isLoading && data.length > 0 && (
              <TouchableOpacity
                style={styles.retryButton}
                onPress={handleRetry}
              >
                <Text style={styles.buttonText}>I want to see new options</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Top-level style
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: 'white',
  },

  // For the activity name
  activityName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },

  // For the "Everyone has spoken!" text
  text: {
    fontSize: 18,
    marginBottom: 10,
  },

  // For the "These are the options:" text
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  // For the InfoCard containing the icon and text
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 'auto',
    width: '80%',
    marginVertical: 10,
    padding: 10,
  },

  // For the IconContainer inside the IconWrapper
  iconWrapperWeather: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },


  // For the IconContainer inside the IconWrapper
  iconContainerWeather: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },




  // For the IconWrapper inside the InfoCard
  iconWrapper: {
    flex: 1,
    alignItems: 'center',
  },

  // For the IconContainer inside the IconWrapper
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
    marginTop: 13,
  },

  // For the TextWrapper inside the InfoCard
  infoTextWrapper: {
    flex: 3,
  },

  // For the bold line of text inside the TextWrapper
  infoTextBold: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  // For the grey line of text inside the TextWrapper
  infoTextGrey: {
    fontSize: 18,
    color: '#666',
  },

  // For the ScrollView containing the options
  scrollView: {
    width: '100%',
    paddingBottom: 10,
    flex: 1,
  },

  // For the wrapper of the content inside the ScrollView
  contentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // For the container of the content inside the ScrollView
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  // For each option box
  optionBox: {
    backgroundColor: '#F3F3F3',
    borderRadius: 10,
    height: 'auto',
    width: '80%',
    marginVertical: 10,
    padding: 10,
  },

  // For the selected option box
  selectedOption: {
    borderColor: '#F35F4B',
    borderWidth: 1,
  },

  // For the IconContainer inside each option box
  itemIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 25,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  // For the name of each item
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // For the address of each item
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
    textAlign: 'center',
  },

  // For the description of each item
  itemDescription: {
    fontSize: 18,
    color: '#666',
    marginTop: 7,
    marginBottom: 10,
  },

  // For the tags of each item
  itemTags: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    backgroundColor: '#eeeeee',
    borderRadius: 10,
    padding: 5,
  },

  // For the retry button
  retryButton: {
    backgroundColor: '#F35F4B',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
  },

  // For the text inside the retry button
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


export default SurveyResults;