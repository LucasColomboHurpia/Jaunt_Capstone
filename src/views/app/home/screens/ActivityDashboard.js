import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView, Dimensions } from 'react-native';
import SurveyContext from '../../../../context/SurveyContext';
import { CameraPlusIcon, Calender, TimeIcon, MapPinIcon, PizzaWhite } from '../../../../assets/icons/Icon';

import { BeefIcon, SushiWhite, ItalianIcon, PicnicIcon, SeafoodIcon, BurguerWhite, PizzaBlack, OrientalIcon, MexicanIcon, VegetablesIcon } from '../../../../assets/icons/Icon'
import { DoIcon, BowlingIcon, PopcornIcon, BeachIcon, BridgeIcon, HikingIcon, SpinningGlobeWhite, BeerBlack, MuseumIcon, GalleryIcon, AmusementParkIcon, KarokeIcon, ArcadeIcon, BoulderingIcon } from '../../../../assets/icons/Icon'

const EatSomethingIcons = [
  { keyword: 'Steakhouse', icon: BeefIcon },
  { keyword: 'Sushi', icon: SushiWhite },
  { keyword: 'Italian', icon: ItalianIcon },
  { keyword: 'Picnic', icon: PicnicIcon },
  { keyword: 'Seafood', icon: SeafoodIcon },
  { keyword: 'Fast Foot', icon: BurguerWhite },
  { keyword: 'Pizza', icon: PizzaWhite },
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
  { keyword: 'Nightclub', icon: SpinningGlobeWhite },
  { keyword: 'Bar', icon: BeerBlack },
  { keyword: 'Museum', icon: MuseumIcon },
  { keyword: 'Gallery', icon: GalleryIcon },
  { keyword: 'AmusementPark', icon: AmusementParkIcon },
  { keyword: 'Karaoke', icon: KarokeIcon },
  { keyword: 'Arcade', icon: ArcadeIcon }
]

const ActivityDashboard = ({ route, navigation }) => {
  const { activityParameters } = useContext(SurveyContext);
  const { setSurveyData, surveyData } = useContext(SurveyContext);

  const activityId = route.params.activityId;

  const item = surveyData?.activityParameters?.find(
    (activity) => activity.id === activityId
  );

  console.log("---------------------------------------");

  console.log("---route.params", route.params);

  console.log("survey", surveyData);

  console.log("---activityId ", activityId);

  console.log("item", item);

  console.log("---------------------------------------");

  console.log(item.dateTime)

  let dateTimeArray = item?.dateTime?.split(' ');  // Splitting the string by the space

  let date = dateTimeArray[0];  // The first element is the date
  let time = dateTimeArray[1];  // The second element is the time

  console.log('Date:', date);
  console.log('Time:', time);

  let addressText = "Still figuring it out!";


  const handleCompleteClick = () => {
    console.log('complete!')

    const updatedSurveyData = {
      ...surveyData,
      activityParameters: surveyData.activityParameters.map(param => {
        if (param.id === activityId) {
          return { ...param, completed: true };
        }
        return param;
      })
    };

    setSurveyData(updatedSurveyData);
    console.log(surveyData)
  };


  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>{item ? item.name : "New Activity!"}</Text>

          {/* no survey yet */}
          {!(item && item?.apiResponse) && (
            <View style={styles.section}>
              <TouchableOpacity
                style={styles.buttonCircle}
                onPress={() =>
                  navigation.navigate("ActivitySurvey", { activityId })
                }
              >
                <Text style={styles.buttonText}>Pending...</Text>
              </TouchableOpacity>

            </View>
          )}

          {/* activity created */}
          {item && item?.apiResponse?.name && (
            <View style={styles.section}>
              <TouchableOpacity style={styles.buttonCircleActive}>
                <Text style={styles.buttonText}>
                  {
                    (() => {
                      const eatIconObject = EatSomethingIcons.find(iconObj => iconObj.keyword === item.apiResponse.matchIcon);
                      const doIconObject = DoSomethingIcons.find(iconObj => iconObj.keyword === item.apiResponse.matchIcon);

                      console.log(item.apiResponse.matchIcon)

                      let IconComponent = DoIcon;  // Using DoIcon as default
                      if (eatIconObject) {
                        IconComponent = eatIconObject.icon;
                      } else if (doIconObject) {
                        IconComponent = doIconObject.icon;
                      }

                      const iconColor = '#FFFFFF';  
                      const iconSize = 90;  

                      return <IconComponent color={iconColor} size={iconSize} />;
                    })()
                  }
                </Text>
                <Text style={styles.buttonText}>{item.apiResponse.name}</Text>
              </TouchableOpacity>
            </View>
          )}


          {item && item?.apiResponse?.coordinates && (
            <View style={styles.buttonContainer}>

              <TouchableOpacity
                onPress={() => navigation.navigate("MapPage", { item })}
              >
                <Text style={{ color: "white", textAlign: 'center', fontSize: 17, fontWeight: 'bold' }}>See Map</Text>
              </TouchableOpacity>
            </View>

          )}

          <View style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Calender size={20} />
              <Text style={styles.cardText}>
                {" "}
                {item
                  ? date || "Still figuring it out!"
                  : "Activity not found"}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
              <TimeIcon size={35} />
              <Text style={styles.cardText}>
                {" "}
                {item
                  ? time || addressText
                  : "Activity not found"}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
              <MapPinIcon size={20} />
              <Text style={styles.cardText}>
                {" "}
                {item
                  ? item?.apiResponse?.address || addressText
                  : "Activity not found"}
              </Text>
            </View>
          </View>

          {item && item?.apiResponse?.Tips && (
            <View style={styles.tipsSection}>
              <Text style={styles.tipsTitle}>Tips</Text>
              {item.apiResponse.Tips.map((tip, index) => (
                <View key={index} style={styles.tipCard}>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          )}


          {item && item?.apiResponse && (

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Media</Text>
              <View style={styles.rectangleContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Media")}>
                  <View style={styles.mediaContainer}>
                    <CameraPlusIcon />
                  </View>
                  <Text>No media has been posted yet.</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {/* =====================*/}
          {!(item && item?.apiResponse) && (
            <View style={styles.buttonContainerStart}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ActivitySurvey", { activityId })
                }              >
                <Text style={{ color: "white", textAlign: 'center', fontSize: 17 }}>Start Activity</Text>
              </TouchableOpacity>
            </View>
          )}
          {/* =====================*/}

          {item && item?.apiResponse?.coordinates && !item.completed && (

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => handleCompleteClick()}
              >
                <Text style={{ color: "white", textAlign: 'center', fontSize: 17 }}>Set Activity to complete</Text>
              </TouchableOpacity>
            </View>

          )}

          {item && item?.apiResponse?.coordinates && item.completed && (

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => handleCompleteClick()}
              >
                <Text style={{ color: "white", textAlign: 'center', fontSize: 17 }}>Activity Completed!</Text>
              </TouchableOpacity>
            </View>

          )}

        </View>


      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'

  },
  scrollView: {
    flex: 1,
    marginBottom: 10,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 50,
  },
  section: {
    margin: 20,
  },
  buttonContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    borderColor: 'grey',
    overflow: 'hidden',
    backgroundColor: '#F35F4B',
    width: '100%',
  },

  buttonContainerStart: {
    marginTop: 90,
    padding: 20,
    borderRadius: 10,
    borderColor: 'grey',
    overflow: 'hidden',
    backgroundColor: '#F35F4B',
    width: '100%',
  },

  buttonContainerComplete: {
    marginTop: 50,
    marginBottom: 15,
    width: '100%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    overflow: 'hidden',
    backgroundColor: '#F35F4B',
  },

  buttonCircle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F35F4B",
    height: 200,
    width: 200,
    borderRadius: 150,

    // iOS shadow properties
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    // Android elevation
    elevation: 7,
  },

  buttonCircleActive: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0BC9B9",
    height: 200,
    width: 200,
    borderRadius: 150,

    // iOS shadow properties
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    // Android elevation
    elevation: 7,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
  card: {
    marginTop: 35,
    padding: 35,
    backgroundColor: "white",
    borderRadius: 18,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  cardText: {
    fontSize: 18,
  },
  tipsSection: {
    marginTop: 40,
    width: "90%",
  },
  tipsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tipCard: {
    backgroundColor: "#E9FFFD",
    borderRadius: 25,
    padding: 18,
    marginBottom: 10,
  },
  tipText: {
    fontSize: 16,
  },
  sectionContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  rectangleContainer: {
    backgroundColor: "#EAEAEA",
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
  },

  mediaContainer: {
    flexDirection: "column",
    alignItems: "center",
  },

});

export default ActivityDashboard;