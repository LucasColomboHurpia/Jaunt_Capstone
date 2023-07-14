import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button, TextInput } from 'react-native';

const answerOptions = ['Shellfish', 'Tree nuts', 'Dairy', 'Glutten','Others'];

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
          { backgroundColor: isSelected ? 'gray' : 'white' },
        ]}
        onPress={() => handleAnswerOptionClick(item)}
      >
        <Text>{item}</Text>
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
  <View style={styles.buttonBack}>
    <Button
      color="gray" 
      title="<"
      onPress={onGoBack}
    />
  </View>
  <View style={styles.buttonNext}>
    <Button
      color="gray" 
      title="Next Step"
      onPress={handleSubmit}
    />
  </View>
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
    marginTop: 30,
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
  answerOption: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    fontSize: 20,
    backgroundColor: 'white',
    borderRadius: 25,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    //width: '80%',
     //   paddingHorizontal: 12, 
  },

  buttonNext: {

  }
});

export default Question2;
