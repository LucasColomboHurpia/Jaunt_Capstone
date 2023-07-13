import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import SurveyContext from '../../../../../context/SurveyContext';
import { WeatherComponent } from '../WeatherComponent';

const ActivityQuestion1 = ({ onAnswer }) => {
  const { activityParameters } = useContext(SurveyContext);

  // Check if activityParameters exists before trying to access it
  const item = activityParameters && activityParameters.length > 0 ? activityParameters[activityParameters.length - 1] : {};

  const handleAnswer = (answer, questionKey) => {
    onAnswer(answer, questionKey); // Directly pass answer to parent
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.name}</Text>
      <WeatherComponent />
      <Text style={styles.subtitle}>What do you wanna do?</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionDo} onPress={() => handleAnswer("Do Something", 'UserWouldLikeTo')}>
          <Text style={styles.optionText}>Do Something</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionEat} onPress={() => handleAnswer("Eat Something", 'UserWouldLikeTo')}>
          <Text style={styles.optionText}>Eat Something</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionBoth} onPress={() => handleAnswer("Both", 'UserWouldLikeTo')}>
          <Text style={styles.optionText}>Both</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { height, width } = Dimensions.get('window');
const optionsHeight = height * 0.6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    position: 'relative',
    marginTop: 20,
    height: optionsHeight,
    width: '100%',
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
  },
  optionDo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bbb',
  },
  optionEat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  optionBoth: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#999',
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  weatherText: {
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default ActivityQuestion1;
