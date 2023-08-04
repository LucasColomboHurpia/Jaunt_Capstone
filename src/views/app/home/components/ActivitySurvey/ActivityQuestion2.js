import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

import SurveyContext from '../../../../../context/SurveyContext';

import {
  BackIcon,
  BeefIcon,
  PicnicIcon,
  ItalianIcon,
  SushiBlack,
  BurguerBlack,
  PizzaBlack,
  OrientalIcon,
  VegetableIcon,
  BowlingIcon,
  PopcornIcon,
  BeachIcon,
  BridgeIcon,
  HikingIcon,
  NighClubIcon,
  MuseumIcon,
  GalleryIcon,
  AmusementParkIcon,
  KarokeIcon,
  ArcadeIcon,
  BoulderingIcon,
  BurguerWhite,
} from "../../../../../assets/icons/Icon";

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
  { name: 'Arcade', color: '#F35F4B', icon: <ArcadeIcon size={70} color={'black'}/> },
  { name: 'Picnic', color: '#F3754B', icon: <PicnicIcon size={70} color={'black'}/> },
  { name: 'Italian', color: '#F38F4B', icon: <ItalianIcon size={70} color={'black'}/> },
  { name: 'Sushi', color: '#F3A94B', icon: <SushiBlack size={70} color={'black'}/> },
  { name: 'Burguer', color: '#F3C34B', icon: <BurguerBlack size={70} color={'black'}/> },
  { name: 'Pizza', color: '#F3DD4B', icon: <PizzaBlack size={70} color={'black'}/> },
  { name: 'Oriental', color: '#F3F74B', icon: <OrientalIcon size={70} color={'black'}/> },
  { name: 'Vegetables', color: '#D4F34B', icon: <VegetableIcon size={70} color={'black'}/> },
  { name: 'Bowling', color: '#B1F34B', icon: <BowlingIcon size={70} color={'black'}/> },
  { name: 'NighClub', color: '#8FF34B', icon: <NighClubIcon size={70} color={'black'}/> },
  { name: 'Popcorn', color: '#6CF34B', icon: <PopcornIcon size={70} color={'black'}/> },
  { name: 'Beach', color: '#49F34B', icon: <BeachIcon size={70} color={'black'}/> },
  { name: 'Bridge', color: '#4BF36C', icon: <BridgeIcon size={70} color={'black'}/> },
  { name: 'Hiking', color: '#4BF38F', icon: <HikingIcon size={70} color={'black'}/> },
  { name: 'Gallery', color: '#4BF3B1', icon: <GalleryIcon size={70} color={'black'}/> },
  { name: 'Karoke', color: '#4BF3D4', icon: <KarokeIcon size={70} color={'black'}/> },
];

const ActivityQuestion2 = ({ onAnswer, onGoBack }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [displayedOptions, setDisplayedOptions] = useState(activities.slice(0, 7).map((activity, index) => ({
    icon: activity.icon,
    name: activity.name,
    color: activity.color,
    styles: positionData[index],
    radius: radiusData[index],
  })));

  const handleAnswerOptionClick = (option) => {
    if (selectedOptions.length >= 7) {
      return;
    }
    
    setSelectedOptions((prevOptions) => [...prevOptions, option]);
    setDisplayedOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[newOptions.findIndex((opt) => opt.name === option.name)] = getNextOption(option);
      return newOptions;
    });
  };

  const getNextOption = (currentOption) => {
    const currentIndex = activities.findIndex(activity => activity.name === currentOption.name);
    let nextIndex = (currentIndex + 1) % activities.length;
  
    while (displayedOptions.find((option) => option.name === activities[nextIndex].name)) {
      nextIndex = (nextIndex + 1) % activities.length;
    }
  
    return {
      icon: activities[nextIndex].icon,
      name: activities[nextIndex].name,
      styles: currentOption.styles,
      radius: currentOption.radius,
      color: activities[nextIndex].color,
    };
  };
  
  const handleSubmit = () => {
    onAnswer(selectedOptions.map(option => option.name), 'preferences');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>Tap items you like!</Text>

      <View style={styles.answerOptionsContainer}>
        {displayedOptions.map((option) => (
          <TouchableOpacity
            key={option.name}
            style={[
              styles.answerOption,
              option.styles,
              { width: option.radius * 2, height: option.radius * 2, borderRadius: option.radius, backgroundColor: option.color },
            ]}
            onPress={() => handleAnswerOptionClick(option)}
          >
            {option.icon}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.tagsContainer}>
        {selectedOptions.slice(0, 7).map((option, index) => (
          <View key={index} style={[styles.tag, { backgroundColor: option.color }]}>
            <Text style={styles.tagText}>{option.name}</Text>
          </View>
        ))}
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
    backgroundColor: 'white',
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
    position: "absolute",
    bottom:-15,
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

export default ActivityQuestion2;
