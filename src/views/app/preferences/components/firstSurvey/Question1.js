import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

import {VegetableIcon, VeganIcon, FishIcon, ChickenIcon} from '../../../../../assets/icons/Icon'

const answerOptions = ['Vegetarian', 'Vegan', 'Pescatarian', 'None'];

const Question1 = ({ onAnswer, onGoBack  }) => {
  const getIcon = (item) => {
    switch (item) {
      case 'Vegetarian':
        return <VegetableIcon size={105}/>;
      case 'Vegan':
        return <VeganIcon size={105}/>;
      case 'Pescatarian':
        return <FishIcon  size={105}/>;
      case 'None':
        return <ChickenIcon size={105} />;
      default:
        return null;
    }
  };

  const renderAnswerOption = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.answerOption}
        onPress={() => onAnswer(item,'Diet')}
      >
        <Text>{item}</Text>
        {getIcon(item)}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        We'd like to know you better...
      </Text>
      <Text style={styles.questionText}>Do you have any diet type?</Text>
      <FlatList
        data={answerOptions}
        numColumns={2}
        renderItem={renderAnswerOption}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.answerOptionsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20,
  },
  questionText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  answerOptionsContainer: {
    alignItems: 'center',
  },
  answerOption: {
    width: 150,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Question1;
