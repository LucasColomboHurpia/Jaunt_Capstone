import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const answerOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

const Question3 = ({ onAnswer }) => {
  const renderAnswerOption = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.answerOption}
        onPress={() => onAnswer(item)}
      >
        <Text>{item}</Text>
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

export default Question3;