import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Text from "../../../../../shared-components/Text";
import SurveyContext from "../../../../../context/SurveyContext";
import { WeatherComponent } from "../WeatherComponent";
import { DoIcon } from "../../../../../assets/icons/Icon";
import { EatIcon, SunIcon } from "../../../../../assets/icons/Icon";

const ActivityQuestion1 = ({ onAnswer }) => {
  const { currentActivity } = useContext(SurveyContext);

  const handleAnswer = (answer, questionKey) => {
    onAnswer(answer, questionKey); 
  };

  return (
    <View style={styles.container}>
      <Text variant="heading1" style={styles.title}>
        {currentActivity?.activityName}
      </Text>

<View style={styles.weatherWrapper}>
        <View style={styles.sunIconContainer}>
          <SunIcon color="#F35F4B" size={41} />
        </View>
        <Text style={styles.weatherComponent}>
          <WeatherComponent />
        </Text>
      </View>

      <View style={styles.subtitleWrapper}>
        <Text style={styles.subtitle}>What do you wanna do?</Text>
      </View>
      <View style={styles.optionsContainerWrapper}>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionDo}
            onPress={() => handleAnswer("do something", "userWouldLikeTo")}
          >
            <Text style={styles.optionText}>Do Something</Text>
            <DoIcon color="#000000" size={150} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionEat}
            onPress={() => handleAnswer("Eat Something", "userWouldLikeTo")}
          >
            <Text style={styles.optionText}>Eat Something</Text>
            <EatIcon color="#000000" size={150} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionBoth}
            onPress={() => handleAnswer("both", "userWouldLikeTo")}
          >
            <Text style={styles.optionText}>Both</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonNext} onPress={handleAnswer}>
          <Text style={styles.buttonText}>Next Step</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSkip}>
          <Text style={styles.buttonText}>I Don't Know!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { height, width } = Dimensions.get("window");
const optionsHeight = height * 0.4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    // alignItems: "flex-start", 
    backgroundColor: "white",
    flexDirection: "row",
    textAlign: "left"
  },
  subtitleWrapper: {
    position: "absolute",
    bottom: height * 0.65,
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
  },
  subtitle: {
    backgroundColor: "white",
    fontSize: 22,
    marginTop: 10, 

  },
  optionsContainer: {
    position: "relative",
    height: optionsHeight,
    width: "100%",
    flexDirection: "row",
    overflow: "hidden",
    alignContent: "center",
    backgroundColor: "white",

    justifyContent: "center",
  },
  optionsContainerWrapper: {
    position: "absolute",
    bottom: height * 0.2,
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
  },
  optionDo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EAEAEA",
    margin: 4,
    borderRadius: 10,
  },
  optionEat: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EAEAEA",
    margin: 4,
    borderRadius: 10,
  },
  optionBoth: {
    position: "absolute",
    bottom: 0,
    height: 60,
    marginTop: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#969696",
    borderRadius: 10,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  weatherText: {
    fontSize: 14,
    marginTop: 20,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 0,
    flexDirection: "column",
    width: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  buttonNext: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#F35F4B",
    borderRadius: 15,
    fontWeight: "bold",
    margin: 5,
    padding: 15,
    width: "45%",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonSkip: {
    backgroundColor: "gray",
    borderRadius: 15,
    fontWeight: "bold",
    margin: 5,
    padding: 15,
    width: "45%",
    alignItems: "center",
  },
  weatherWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,

  },
  sunIconContainer: {
    marginRight: 10,
  },
  weatherComponent: {
    flex: 1,
  },

});

export default ActivityQuestion1;
