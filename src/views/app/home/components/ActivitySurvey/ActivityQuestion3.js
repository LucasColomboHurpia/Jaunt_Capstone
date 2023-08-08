import React, { useContext, useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Button from '../../../../../shared-components/Button';
import Text from '../../../../../shared-components/Text';
import Slider from '@react-native-community/slider';
import { BackIcon } from '../../../../../assets/icons/Icon';
import { WeatherComponent } from '../WeatherComponent';
import SurveyContext from '../../../../../context/SurveyContext';


const ActivityQuestion3 = ({ onAnswer, onGoBack }) => {
  const [sliderValue, setSliderValue] = useState(5);
  const { currentActivity } = useContext(SurveyContext);

  const handleNextStep = () => {
    onAnswer(sliderValue, 'budget');
  };
return (
  <View style={styles.container}>
    <Text variant="heading1" style={styles.title}>{currentActivity?.activityName}</Text>
    <Text style={styles.titleText}>How much do you plan to spend?</Text>
    <View style={styles.backgroundBox}>
      <View style={styles.squareBackground}>
      {/* <Text style={styles.valueText}>${sliderValue} CAD</Text> */}
      <View style={styles.cost}>
      <Text style={styles.dollar}>$</Text>
      <Text style= {styles.valueText}>{sliderValue}</Text>
      <Text style= {styles.currency}>CAD</Text>
      </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.labelText}>$5</Text>
          <View style={styles.sliderShadow}>
<Slider
style={styles.slider}
minimumValue={5}
maximumValue={150}
minimumTrackTintColor="#808080"
maximumTrackTintColor="#808080"
thumbTintColor="#F35F4B"
thumbStyle={{ height: 50, width: 50, borderRadius: 15 }}
step={1}
value={sliderValue}
onValueChange={(value) => setSliderValue(value)}
/>
</View>
<Text style={styles.labelText}>$150</Text>
</View>
</View>
</View>

<View style={styles.buttonContainer}>
<TouchableOpacity style={styles.buttonNext} onPress={handleNextStep}>
<Text style={styles.buttonText}>Next Step</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.buttonSkip}>
<Text style={styles.buttonText}>I Don't Know!</Text>
</TouchableOpacity>
</View>
</View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "white",
  },

  title: {
    marginTop: 35,
    marginBottom: 10,
    textAlign: "left",
  },
  titleText: {
    fontSize: 18,
    textAlign: "center",
  },
  cost: {
    display: 'flex',
    flexDirection: 'row',
  },
  valueText: {
    fontSize: 150,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#19445A",
    fontStyle: "normal",
  },
  currency: {
    fontSize: 26,
    lineHeight: 120,
    alignContent:"center",
    color: "#19445A",
  },
  dollar:
  {
    lineHeight: 120,
    fontSize: 26,
alignContent:"center",
    color: "#19445A",
  },
  backgroundBox: {
    backgroundColor: "white",
    position: "absolute",
    top: 130,
    marginTop: 50,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 10,
  },
  squareBackground: {
    backgroundColor: "#F7F7F7",
    width: 355,
    height: 295,
    borderRadius: 10,
    padding: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    alignSelf: "center",
  },
  sliderShadow: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  slider: {
    width: "100%",
    height: 40,
    backgroundColor: "#F35F4B)",
  },
  labelText: {
    fontSize: 16,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  backIconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonBack: {
    flex: 1,
    justifyContent: "flex-start",
  },

  buttonNext: {
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
  },

});

export default ActivityQuestion3;
