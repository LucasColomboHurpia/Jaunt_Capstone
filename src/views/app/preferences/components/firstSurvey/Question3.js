import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

import {MeatIcon, MilkIcon, VeganIcon, BreadIcon, WineIcon, ChickenIcon, ShrimpIcon, DairyIcon, SmokingIcon, BeerIcon} from '../../../../../assets/icons/Icon'

const answerOptions = [
  { text: 'Picnic', styles: { top: '22%', left: '2%' }, radius: 65, icon: <BreadIcon size={100}/> },
  { text: 'Parks', styles: { top: '10%', right: '0%' }, radius: 75, icon: <DairyIcon size={100}/> },
  { text: 'Vegan Food', styles: { top: '45%', left: '5%' }, radius: 85, icon: <VeganIcon size={100}/> },
  { text: 'Meat', styles: { top: '37%', right: '-5%' }, radius: 55, icon: <MeatIcon size={100}/> },
  { text: 'Bar', styles: { bottom: '80%', left: '10%' }, radius: 55, icon: <BeerIcon size={100}/> },
  { text: 'Karaoke', styles: { bottom: '10%', right: '-20%' }, radius: 60, icon: <WineIcon size={100}/> },
  { text: 'Clubbing', styles: { bottom: '22%', right: '8%' }, radius: 70, icon: <SmokingIcon size={100}/> },
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
    onAnswer(selectedOptions, 'DoLike');
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
                { backgroundColor: isSelected ? '#F35F4B' : 'white' },
                option.styles,
                { width: option.radius * 2, height: option.radius * 2, borderRadius: option.radius },
              ]}
              onPress={() => handleAnswerOptionClick(option)}
            >
              {option.icon}
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
