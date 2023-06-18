import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

const answerOptions = [
  { text: 'Option 1', styles: { top: '22%', left: '2%' }, radius: 65 },
  { text: 'Option 2', styles: { top: '10%', right: '0%' }, radius: 75 },
  { text: 'Option 3', styles: { top: '45%', left: '5%' }, radius: 85 },
  { text: 'Option 4', styles: { top: '37%', right: '-5%' }, radius: 55 },
  { text: 'Option 5', styles: { bottom: '80%', left: '10%' }, radius: 55 },
  { text: 'Option 6', styles: { bottom: '10%', right: '-20%' }, radius: 60 },
  { text: 'Option 7', styles: { bottom: '22%', right: '8%' }, radius: 70 },
];

const Question3 = ({ onAnswer, onGoBack }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleAnswerOptionClick = (option) => {
    setSelectedOptions((prevOptions) => {
      if (prevOptions.includes(option.text)) {
        // Option already selected, deselect it
        return prevOptions.filter((prevOption) => prevOption !== option.text);
      } else {
        // Option not selected yet, add it
        return [...prevOptions, option.text];
      }
    });
  };

  const handleSubmit = () => {
    onAnswer(selectedOptions);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>Tap items you like!</Text>

      <View style={styles.answerOptionsContainer}>
        {answerOptions.map((option) => {
          const isSelected = selectedOptions.includes(option.text);
          return (
            <TouchableOpacity
              key={option.text}
              style={[
                styles.answerOption,
                { backgroundColor: isSelected ? 'gray' : 'white' },
                option.styles,
                { width: option.radius * 2, height: option.radius * 2, borderRadius: option.radius },
              ]}
              onPress={() => handleAnswerOptionClick(option)}
            >
              <Text>{option.text}</Text>
            </TouchableOpacity>
          );
        })}
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
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
});

export default Question3;
