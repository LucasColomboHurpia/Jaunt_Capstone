import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

const positionData = [
  { top: '22%', left: '2%' },
  { top: '10%', right: '0%' },
  { top: '45%', left: '5%' },
  { top: '37%', right: '-5%' },
  { bottom: '80%', left: '10%' },
  { bottom: '10%', right: '-20%' },
  { bottom: '22%', right: '8%' },
  { top: '15%', left: '35%' },
  { bottom: '60%', right: '25%' },
  { top: '65%', left: '15%' },
  { bottom: '35%', right: '15%' },
  { top: '25%', left: '60%' },
  { bottom: '10%', left: '30%' },
  { top: '70%', right: '30%' },
  { bottom: '45%', left: '55%' },
  { top: '15%', right: '55%' },
];

const radiusData = [
  65, 75, 85, 55, 55, 60, 70, 65, 75, 85, 55, 55, 60, 70, 65, 75,
];

const activities = [
  'Restaurant',
  'Bar',
  'Movie Theatre',
  'Art Gallery',
  'Museum',
  'Coffee Shop',
  'Park',
  'Shopping Mall',
  'Beach',
  'Nightclub',
  'Sports Game',
  'Concert',
  'Fitness Center',
  'Spa',
  'Hiking Trail',
  'Festival'
];

const ActivityQuestion2 = ({ onAnswer, onGoBack }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [displayedOptions, setDisplayedOptions] = useState(activities.slice(0, 7).map((activity, index) => ({
    text: activity,
    styles: positionData[index],
    radius: radiusData[index],
  })));

  const handleAnswerOptionClick = (option) => {
    if (selectedOptions.length >= 7) {
      return;
    }
    
    setSelectedOptions((prevOptions) => [...prevOptions, option.text]);
    setDisplayedOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[newOptions.findIndex((opt) => opt.text === option.text)] = getNextOption(option);
      return newOptions;
    });
  };

  const getNextOption = (currentOption) => {
    const currentIndex = activities.indexOf(currentOption.text);
    let nextIndex = (currentIndex + 1) % activities.length;
  
    while (displayedOptions.find((option) => option.text === activities[nextIndex])) {
      nextIndex = (nextIndex + 1) % activities.length;
    }
  
    return {
      text: activities[nextIndex],
      styles: currentOption.styles,
      radius: currentOption.radius,
    };
  };
  

  const handleSubmit = () => {
    onAnswer(selectedOptions, 'Preferences');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>Tap items you like!</Text>

      <View style={styles.answerOptionsContainer}>
        {displayedOptions.map((option) => (
          <TouchableOpacity
            key={option.text}
            style={[
              styles.answerOption,
              option.styles,
              { width: option.radius * 2, height: option.radius * 2, borderRadius: option.radius, backgroundColor: '#D1D0CE' },
            ]}
            onPress={() => handleAnswerOptionClick(option)}
          >
            <Text>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tagsContainer}>
        {selectedOptions.slice(0, 7).map((option, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{option}</Text>
          </View>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="<"
          color="gray"
          onPress={onGoBack}
        />
        <Button
          title="Next Step"
          color="gray"
          onPress={handleSubmit}
        />
      </View>
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
  questionText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  answerOptionsContainer: {
    flex: 1,
    width: '100%',

  },
  answerOption: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',

  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 50,
  },
  tag: {
    backgroundColor: 'lightgray',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  tagText: {
    color: 'white',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
});

export default ActivityQuestion2;
