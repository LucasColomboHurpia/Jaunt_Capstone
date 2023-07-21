import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Button from '../../../../../shared-components/Button';
import Text from '../../../../../shared-components/Text';
import Slider from '@react-native-community/slider';
import { BackIcon } from '../../../../../assets/icons/Icon';
import { WeatherComponent } from '../WeatherComponent';

const ActivityQuestion3 = ({ onAnswer, onGoBack }) => {
  const [sliderValue, setSliderValue] = useState(5);

  const handleNextStep = () => {
    onAnswer(sliderValue, 'Budget');
  };

  return (
    <View style={styles.container}>
      <Text variant = "heading1" style= {styles.title}>New Activity</Text>
      <Text style={styles.titleText}>How much do you plan to spend?</Text>
      <View style = {styles.backgroundBox}>
      <Text style={styles.valueText}>${sliderValue} CAD</Text>
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonBack} onPress={onGoBack}>
          <View style={styles.backIconContainer}>
            <BackIcon size={24} color='black' />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNext} onPress={handleNextStep}>
          <Text style={styles.buttonText}>Next Step</Text>
        </TouchableOpacity>
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
  },

  title: {
    marginTop: 35, 
    marginBottom: 10,
    textAlign: 'center',
  },
  titleText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  valueText: {
    fontSize: 70,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center', 
    color: "#19445A",
    fontStyle: "normal"   
  },
  backgroundBox: {
    width: 355,
    height: 345,
    backgroundColor: '#D3D3D3',
    position: 'absolute',
    top: 130,
    marginTop: 57,
    zIndex: -1,
    justifyContent: 'center',
    alignContent: "center",
    borderRadius: 10,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    width: '100%',
    justifyContent: "center",
    alignSelf: "center"
  },
  sliderShadow: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  slider: {
    width: '100%',
    height: 40,
    backgroundColor: "#F35F4B)",
  },
  labelText: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  backIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonBack: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  buttonNext: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#F35F4B',
    borderRadius: 15,
    fontWeight: 'bold',
    margin: 10,
    padding: 20,
    width: '45%',
    alignItems: 'center'
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',

  },
});

export default ActivityQuestion3;





