import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import AddActivityButton from '../../../../shared-components/addActivityButton';
import Text from '../../../../shared-components/Text';

import { SettingsIcon, PizzaWhite, NavIconRight } from '../../../../assets/icons/Icon'

import SurveyContext from '../../../../context/SurveyContext';

import { BeefIcon, SushiWhite, ItalianIcon, PicnicIcon, SeafoodIcon, BurguerWhite, PizzaBlack, OrientalIcon, MexicanIcon, VegetablesIcon } from '../../../../assets/icons/Icon'
import { DoIcon, BowlingIcon, PopcornIcon, BeachIcon, BridgeIcon, HikingIcon, SpinningGlobeWhite, BeerBlack, MuseumIcon, GalleryIcon, AmusementParkIcon, KarokeIcon, ArcadeIcon, BoulderingIcon } from '../../../../assets/icons/Icon'
import AuthContext from '../../../../context/AuthContext';
import { useTheme } from 'styled-components';
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


const HomePage = ({ navigation }) => {
  const { activities, setActivities } = useContext(SurveyContext);
  const { authUser } = useContext(AuthContext);

  const upcomingActivities = activities.filter(activity => activity.status === "upcoming");
  const pendingActivities = activities.filter(activity => activity.status === "pending");

  useEffect(() => {
    (async () => {
        const response = await api.get('/activities');
        if(response.status === 200) {
            setActivities(response.data.activities)
        }
    })()
  }, [])

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { console.log('profile icon clicked'); navigation.navigate('Profile') }} style={styles.settingsIcon}>
        <SettingsIcon color="#000000"/>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text variant="heading1" options={{ color: theme.colors.primary.default}}>Hello {authUser?.name.split(' ')[0]}!</Text>
        <Text style={[styles.subText, { marginTop: 20 }]}>
          These are your upcoming activities, ready for adventure?
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.body}>
          {upcomingActivities.length > 0 ? (
            upcomingActivities.map((activity) => (
              <TouchableOpacity
                key={activity.id}
                style={styles.upcomingActivityContainer}
                onPress={() => console.log(activity.id)}
              >
                <View style={styles.upcomingActivityHeader}>
                  <Text style={styles.upcomingActivityTitle}>{activity.activityName}</Text>
                </View>
                <Text style={styles.upcomingActivityDetails}>Date: {activity.startDateTime}</Text>
                <View style={styles.upcomingInnerCardContainer}>
                  <View style={styles.upcomingCircle}>
                    {
                      (() => {
                        const eatIconObject = EatSomethingIcons.find(iconObj => iconObj.keyword === activity?.activityIcon);
                        const doIconObject = DoSomethingIcons.find(iconObj => iconObj.keyword === activity?.activityIcon);

                        let IconComponent = DoIcon;  // Using DoIcon as default
                        if (eatIconObject) {
                          IconComponent = eatIconObject.icon;
                        } else if (doIconObject) {
                          IconComponent = doIconObject.icon;
                        }

                        const iconColor = '#FFFFFF';  
                        const iconSize = 33;  

                        return <IconComponent color={iconColor} size={iconSize} />;
                      })()
                    }
                  </View>
                  <View style={styles.upcomingActivityInfoContainer}>
                    
                    <Text style={styles.upcomingActivityDetailsName}>{activity?.eventName}</Text>
                    <Text
                      style={styles.upcomingActivityDetailsAddress}
                    >
                      {activity?.address}
                    </Text>
                  </View>
              
                <TouchableOpacity>
                  <TouchableOpacity style={styles.navIcon} onPress={() => navigation.navigate('ActivityDashboard', { activityId: activity.id })}>
                  <NavIconRight size={20} style={styles.navIcon}></NavIconRight>
                  </TouchableOpacity>
                </TouchableOpacity>
                </View>
              </TouchableOpacity>
              
            ))
          ) : null}


          {pendingActivities.length > 0 ? (
            <>
              <Text
                style={[
                  styles.subText,
                  { textAlign: "left", marginBottom: 10, marginTop: 10 },
                ]}
              >
                Pending activities:
              </Text>
              {pendingActivities.map((activity) => (
                <TouchableOpacity
                  key={activity.id}
                  style={styles.activityContainer}
                  onPress={() => console.log(activity.id)}
                >
                  <View style={styles.activityHeader}>
                    <Text style={styles.activityTitle}>{activity.activityName}</Text>
                  </View>

                  <View style={styles.pendingBadge}>
                    <Text style={styles.pendingText}>PENDING</Text>
                  </View>

                  <Text style={styles.activityDetails}>{activity.startDateTime}</Text>

                  <TouchableOpacity
                    style={styles.detailButton}
                    onPress={() => navigation.navigate('ActivityDashboard', { activityId: activity.id })}
                  >
                    <Text style={styles.detailButtonText}>More Details</Text>
                  </TouchableOpacity>

                </TouchableOpacity>

              ))}
            </>
          ) : null}

          {/* Conditional rendering for no activities */}
          {upcomingActivities.length === 0 && pendingActivities.length === 0 && (
            <View style={styles.noActivitiesContainer}>
              <Text style={styles.noActivitiesText}>You have no activities at the moment</Text>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('CreateActivity')}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.buttonTextPlus}>+</Text>
                  <Text style={styles.buttonText}>Create New Activity</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
      <AddActivityButton navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    width: "100%",
    padding: 20,
    backgroundColor: 'white'
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 50,
  },
  header: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
  },
  body: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    overflow: "scroll",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 32,
  },
  subText: {
    fontSize: 16,
    color: "gray",
    textAlign: "left",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  noActivitiesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 350,
  },
  noActivitiesText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activityContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#c0c0c0',
    borderWidth: 1,
    padding: 15,
    borderRadius: 20,
    marginBottom: 5,
    width: Dimensions.get("window").width - 40,
  },
  activityHeader: {
    flexDirection: "column",
    marginBottom: 5,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 10,
    textAlign: "left",
  },
  activityDetails: {
    textAlign: "left",
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 10,
  },




  /// upcoming ==========================================
  upcomingActivityContainer: {
    backgroundColor: 'white',
    marginBottom: 5,
    marginTop: 5,
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFECE7',
    width: 370,
  },
  upcomingActivityHeader: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  upcomingActivityTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  upcomingActivityDetails: {
    marginTop: 10,
    fontSize: 16,
    flexShrink: 1,
  },
  upcomingInnerCardContainer: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FFECE7',
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  upcomingCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FB6049',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  upcomingActivityInfoContainer: {
    flex: 1,
    flexShrink: 1,
    marginLeft: 5,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  upcomingActivityDetailsName: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  upcomingActivityDetailsAddress: {
    fontSize: 13,
    flexShrink: 1,
    maxWidth: '100%',
    fontWeight: 300,
    lineHeight: 18,
  },

  //=======================================================

  detailButton: {
    backgroundColor: '#343434',
    borderRadius: 10,
    paddingVertical: 10,
    width: '45%',
    alignSelf: 'flex-start',
    marginTop: 10,
  },

  detailButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  addButton: {
    width: 350,
    height: 70,
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: '#F35F4B',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },

  buttonTextPlus: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 20,
    marginLeft: 20,
  },

  settingsIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 50,
  },

  pendingBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFC928',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },

  pendingText: {
    color: 'black',
    fontSize: 14,
  },
  navIcon: {
alignSelf: "flex-end",
}
});

export default HomePage;