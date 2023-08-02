import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

import { BackIcon, BeerBlack, FancyGlassBlack, SushiBlack, WineBlack, BurguerBlack, PizzaBlack, SpinningGlobeBlack, BeerWhite, FancyGlassWhite, SushiWhite, WineWhite, BurguerWhite, PizzaWhite, SpinningGlobeWhite, MeatIcon, MilkIcon, VeganIcon, BreadIcon, WineIcon, ChickenIcon, ShrimpIcon, DairyIcon, SmokingIcon, BeerIcon } from '../../../../../assets/icons/Icon'

const answerOptions = [
  { text: 'Pizza', styles: { top: '22%', left: '2%' }, radius: 65, icon: <PizzaBlack size={90} />, iconSelected: <PizzaWhite size={90} /> },
  { text: 'Fancy Places', styles: { top: '10%', right: '0%' }, radius: 75, icon: <FancyGlassBlack size={90} />, iconSelected: <FancyGlassWhite size={90} /> },
  { text: 'Sushi', styles: { top: '45%', left: '5%' }, radius: 80, icon: <SushiBlack size={90} />, iconSelected: <SushiWhite size={90} /> },
  { text: 'Parties', styles: { top: '37%', right: '-5%' }, radius: 55, icon: <SpinningGlobeBlack size={90} />, iconSelected: <SpinningGlobeWhite size={90} /> },
  { text: 'Bar', styles: { bottom: '80%', left: '10%' }, radius: 55, icon: <BreadIcon size={100} color = "#000000"/>, iconSelected: <BreadIcon size={100} color = "#FCFCFC"/> },
  { text: 'Beer', styles: { bottom: '10%', right: '-20%' }, radius: 60, icon: <BeerBlack size={90} />, iconSelected: <BeerWhite size={90} /> },
  { text: 'Burguers', styles: { bottom: '22%', right: '8%' }, radius: 70, icon: <BurguerBlack size={90} />, iconSelected: <BurguerWhite size={90} /> },
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
    onAnswer(selectedOptions, 'foodDishes');
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
                { backgroundColor: isSelected ? '#F35F4B' : '#F3F3F3' },
                option.styles,
                { width: option.radius * 2, height: option.radius * 2, borderRadius: option.radius },
              ]}
              onPress={() => handleAnswerOptionClick(option)}
            >
              {isSelected ? option.iconSelected : option.icon}
            </TouchableOpacity>
          );
        })}
      </View>


      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonBack} onPress={onGoBack}>
          <View style={styles.backIconContainer}>
            <BackIcon size={24} color='black' />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNext} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Next Step</Text>
        </TouchableOpacity>
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
    fontWeight: 'bold',
    fontSize: 19,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 12,
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

  }
});

export default Question3;