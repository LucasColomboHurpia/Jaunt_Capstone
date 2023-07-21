import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Text from '../../../../../shared-components/Text';
import SurveyContext from '../../../../../context/SurveyContext';
import { WeatherComponent } from '../WeatherComponent';
import { DoIcon } from '../../../../../assets/icons/Icon';
import { EatIcon } from '../../../../../assets/icons/Icon';

const ActivityQuestion1 = ({ onAnswer }) => {
  const { activityParameters } = useContext(SurveyContext);

  // Check if activityParameters exists before trying to access it
  const item = activityParameters && activityParameters.length > 0 ? activityParameters[activityParameters.length - 1] : {};

  const handleAnswer = (answer, questionKey) => {
    onAnswer(answer, questionKey); // Directly pass answer to parent
  };

  return (
    <View style={styles.container}>
    <Text variant="heading1">New Activity</Text>
    <WeatherComponent />
    <View style={styles.subtitleWrapper}>
        <Text style={styles.subtitle}>What do you wanna do?</Text>
      </View>    
      <View style={styles.optionsContainerWrapper}>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionDo} onPress={() => handleAnswer("Do Something", 'UserWouldLikeTo')}>
          <Text style={styles.optionText}>Do Something</Text>
          <DoIcon color = "#000000" size = {150}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionEat} onPress={() => handleAnswer("Eat Something", 'UserWouldLikeTo')}>
          <Text style={styles.optionText}>Eat Something</Text>
          <EatIcon color = "#000000" size = {150}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionBoth} onPress={() => handleAnswer("Both", 'UserWouldLikeTo')}>
          <Text style={styles.optionText}>Both</Text>
        </TouchableOpacity>
      </View>
    </View>


      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonNext} onPress={handleAnswer}>
          <Text style={styles.buttonText}>Next Step</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSkip} >
          <Text style={styles.buttonText}>I dont Know</Text>
        </TouchableOpacity>
      </View>
      </View>
    // </View>

    
  );
};

const { height, width } = Dimensions.get('window');
const optionsHeight = height * 0.4;

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
  subtitleWrapper: {
    position: 'absolute',
    bottom: height * 0.7, // Adjust this value to bring up the subtitle
    width: '100%',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
  },
  optionsContainer: {
    position: 'relative',
    height: optionsHeight,
    width: '100%',
    flexDirection: 'row',
    overflow: 'hidden',
    alignContent:"center",
    justifyContent: "center",
  },
  optionsContainerWrapper: {
    position: 'absolute',
    bottom: height * 0.25, 
    width: '100%',
    alignItems: 'center',
  },
  optionDo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    margin:4,
    borderRadius:10,
  },
  optionEat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    margin:4,
    borderRadius:10,

  },
  optionBoth: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    borderRadius:10,
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
  buttonContainer: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "column",
    width: "100%",
    padding: 10,
    justifyContent: 'center',
    alignItems: "center"
  },
  buttonNext: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#F35F4B',
    borderRadius: 15,
    fontWeight: 'bold',
    margin: 5,
    padding: 15,
    width: '45%',
    alignItems: 'center'
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',

  },
  buttonSkip:
  {
    backgroundColor: 'gray',
    borderRadius: 15,
    fontWeight: 'bold',
    margin: 5,
    padding: 15,
    width: '45%',
    alignItems: 'center'
  }
});

export default ActivityQuestion1;
