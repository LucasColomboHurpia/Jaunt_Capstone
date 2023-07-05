import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';
import Slider from '@react-native-community/slider';

const ActivityQuestion3 = ({ onAnswer, onGoBack }) => {
  const [sliderValue, setSliderValue] = useState(5);

  const handleNextStep = () => {
    onAnswer(sliderValue, 'Budget');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>How much to you plan to spend?</Text>
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
            thumbTintColor="#000080"
            thumbStyle={{ height: 30, width: 30, borderRadius: 15 }}
            step={1}
            value={sliderValue}
            onValueChange={(value) => setSliderValue(value)}
          />
        </View>
        <Text style={styles.labelText}>$150</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="<" color="gray" onPress={onGoBack} />
        <Button title="Next Step" color="gray" onPress={handleNextStep} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  valueText: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  sliderShadow: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#808080',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  slider: {
    width: '100%',
    height: 40,
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
});

export default ActivityQuestion3;
