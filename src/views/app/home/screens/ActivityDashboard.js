import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, ScrollView, Dimensions } from 'react-native';
import SurveyContext from '../../../../context/SurveyContext';

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

  let addressText = "Still figuring it out!";

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
              <TouchableOpacity style={styles.buttonCircle}>
                <Text style={styles.buttonText}>[icon]</Text>
                <Text style={styles.buttonText}>{item.apiResponse.name}</Text>
              </TouchableOpacity>
            </View>
          )}

          {item && item?.apiResponse?.coordinates && (
            <View style={styles.buttonContainer}>
              <Button
                title="See Map"
                color="grey"
                onPress={() => navigation.navigate("MapPage", { item })}
              />
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.cardText}>
              Date:{" "}
              {item
                ? item.dateTime || "Still figuring it out!"
                : "Activity not found"}
            </Text>
            <Text style={styles.cardText}>
              Location:{" "}
              {item
                ? item?.apiResponse?.address || addressText
                : "Activity not found"}
            </Text>
          </View>

          {item && item?.apiResponse?.Tips && (
            <View style={styles.tipsSection}>
              <Text style={styles.tipsTitle}>Tips:</Text>
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
              <Button
                color="grey"
                title="Upload Media +"
                onPress={() => navigation.navigate("Media")}
              />
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
  },
  buttonCircle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    height: 200,
    width: 200,
    borderRadius: 150,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
  card: {
    marginTop: 20,
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
    marginTop: 20,
    width: "90%",
  },
  tipsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tipCard: {
    backgroundColor: "lightgrey",
    borderRadius: 25,
    padding: 18,
    marginBottom: 10,
  },
  tipText: {
    fontSize: 16,
  },
  sectionContainer:{
    marginTop: 40,

  }
});

export default ActivityDashboard;
