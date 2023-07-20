import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button, TextInput } from 'react-native';

import { BackIcon, CheckIcon } from '../../../../../assets/icons/Icon'


const answerOptions = ['Shellfish', 'Tree nuts', 'Dairy', 'Glutten', 'Others'];

const Question2 = ({ onAnswer, onGoBack }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [customAnswer, setCustomAnswer] = useState('');

  const handleAnswerOptionClick = (option) => {
    setSelectedOptions((prevOptions) => {
      if (prevOptions.includes(option)) {
        // Option already selected, deselect it
        return prevOptions.filter((prevOption) => prevOption !== option);
      } else {
        // Option not selected yet, add it
        return [...prevOptions, option];
      }
    });
  };

  const renderAnswerOption = ({ item }) => {
    const isSelected = selectedOptions.includes(item);
    return (
      <TouchableOpacity
        style={[
          styles.answerOption,
          { backgroundColor: isSelected ? '#19445A' : '#F3F3F3' },
        ]}
        onPress={() => handleAnswerOptionClick(item)}
      >
        {isSelected && <CheckIcon size={24} color='white' />}
        <Text style={isSelected ? styles.optionTextSelected : styles.optionText}>{item}</Text>
      </TouchableOpacity>
    );
  };


  const handleSubmit = () => {
    const finalAnswers = customAnswer ? [...selectedOptions, customAnswer] : selectedOptions;
    onAnswer(finalAnswers, 'DoNotLike');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>Do you have any medical conditions that restrict you from any extreme activities?</Text>

      <TextInput
        style={styles.input}
        onChangeText={setCustomAnswer}
        value={customAnswer}
        placeholder="ie. Asthma, heart condition, etc."
      />

      <Text style={styles.questionText}>Do you have any allergies?</Text>

      <FlatList
        data={answerOptions}
        renderItem={renderAnswerOption}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.answerOptionsContainer}
        numColumns={2}
      />

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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  questionText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  input: {
    height: 60,
    borderRadius: 15,

    width: 320,
    margin: 12,
    borderWidth: 0.5,
    padding: 15,
  },
  answerOptionsContainer: {
    //  flexDirection: 'row',
    //  flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',

  },

  optionTextSelected: {
    marginLeft: 10,
    color: 'white',
  },

  optionText: {
    color: 'black',
  },

  
  backIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerOption: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 30,
    fontSize: 20,
    borderRadius: 15,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },



  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 12,
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

export default Question2;
