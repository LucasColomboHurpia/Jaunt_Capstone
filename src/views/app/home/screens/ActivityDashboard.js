import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView, Dimensions } from 'react-native';
import SurveyContext from '../../../../context/SurveyContext';
import { Image } from 'react-native';
import { CameraPlusIcon, Calender, TimeIcon, MapPinIcon, PizzaWhite } from '../../../../assets/icons/Icon';

import { BeefIcon, SushiWhite, ItalianIcon, PicnicIcon, SeafoodIcon, BurguerWhite, PizzaBlack, OrientalIcon, MexicanIcon, VegetablesIcon } from '../../../../assets/icons/Icon'
import { DoIcon, BowlingIcon, PopcornIcon, BeachIcon, BridgeIcon, HikingIcon, SpinningGlobeWhite, BeerBlack, MuseumIcon, GalleryIcon, AmusementParkIcon, KarokeIcon, ArcadeIcon, BoulderingIcon } from '../../../../assets/icons/Icon'
import api from '../../../../config/api';

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
  const { currentActivity, setCurrentActivity, activities, setActivities } = useContext(SurveyContext);

  const activityId = route.params.activityId;

  useEffect(() => {
    (async () => {
        const response = await api.get(`/activities/${activityId}`);
        if(response.status === 200) {
            setCurrentActivity(response.data.activity)
        }
    })()

    return () => setCurrentActivity(null)
  }, [activityId])

  const handleCompleteClick = async () => {

    const response = await api.patch(`/activities/${activityId}`, { status: 'completed'});
    
    if(response.status === 200) {
        const { activity } = response.data;
        setCurrentActivity(activity)
        const updatedActivities = activities.map(item => {
            if( item.id === activity.id) {
                return activity;
            }
            return item
        })

        setActivities(updatedActivities)
    }

  };

  if(!currentActivity) {
    return(<></>)
  }

  let startDateTimeArray = currentActivity?.startDateTime?.split('T');  // Splitting the string by the space

  let date = startDateTimeArray[0];  // The first element is the date
  let time = startDateTimeArray[1];  // The second element is the time

  let addressText = "Still figuring it out!";

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>{currentActivity ? currentActivity.activityName : "New Activity!"}</Text>

          {/* no survey yet */}
          {currentActivity.status === "pending" && (
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
          {currentActivity?.eventName && (
            <View style={styles.section}>
              <TouchableOpacity style={styles.buttonCircleActive}>
                <Text style={styles.buttonText}>
                  {
                    (() => {
                      const eatIconObject = EatSomethingIcons.find(iconObj => iconObj.keyword === currentActivity?.activityIcon);
                      const doIconObject = DoSomethingIcons.find(iconObj => iconObj.keyword === currentActivity?.activityIcon);

                      console.log(currentActivity?.activityIcon)

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
                <Text style={styles.buttonText}>{currentActivity?.eventName}</Text>
              </TouchableOpacity>
            </View>
          )}


          {currentActivity?.status !== 'pending' && (
            <View style={styles.buttonContainer}>

              <TouchableOpacity
                onPress={() => navigation.navigate("MapPage", { currentActivity })}
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
                {currentActivity
                  ? date || "Still figuring it out!"
                  : "Activity not found"}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
              <TimeIcon size={35} />
              <Text style={styles.cardText}>
                {" "}
                {currentActivity
                  ? time || addressText
                  : "Activity not found"}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
              <MapPinIcon size={20} />
              <Text style={styles.cardText}>
                {" "}
                {currentActivity
                  ? currentActivity?.address || addressText
                  : "Activity not found"}
              </Text>
            </View>
          </View>

          {currentActivity?.tips?.length !==0 && (
            <View style={styles.tipsSection}>
              <Text style={styles.tipsTitle}>Tips</Text>
              {currentActivity?.tips?.map((tip, index) => (
                <View key={index} style={styles.tipCard}>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          )}


          {currentActivity && currentActivity?.apiResponse && !currentActivity?.images &&(

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Media</Text>
              <View style={styles.rectangleContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Media", { activityId })}>
                  <View style={styles.mediaContainer}>
                    <CameraPlusIcon />
                  </View>
                  <Text>No media has been posted yet.</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

            {currentActivity && currentActivity?.images?.map((uri, index) => {
                return (
                    <View>
                        <View key={index} style={styles.imageWrapper}>
                            <Image source={{ uri }} style={styles.image} />
                        </View>
                    </View>
                )
            })}

          {/* =====================*/}
          {currentActivity?.status === "pending" && (
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

          {currentActivity.status === "upcoming" && (

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => handleCompleteClick()}
              >
                <Text style={{ color: "white", textAlign: 'center', fontSize: 17 }}>Set Activity to complete</Text>
              </TouchableOpacity>
            </View>

          )}

          {currentActivity && currentActivity?.coordinates && currentActivity.completed && (

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

  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  imageWrapper: {
    position: "relative",
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "black",
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },

});

export default ActivityDashboard;