import React, { useContext, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

import Button from './Button';
import Spacer from './Spacer';
import Aligner from './Aligner';
import yay from '../../../../assets/icons/yay';
import SurveyContext from '../../../../context/SurveyContext';

const ActivitySummary = ({ route, navigation }) => {
  const { activityId } = route.params; // Get the activityId from the route params
  const { activities } = useContext(SurveyContext);

  let currentActivity = activities?.find(activity => activity.id === activityId); // Get the activity with the same id

  const handleNavigateToSurveyResults = () => {
    navigation.navigate('SurveyResults', { activityId });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.activity}>{currentActivity.name}</Text>
        <Text style={styles.title}>Thank you</Text>
        <Text style={styles.subtitle}>You are close to setting your plan...</Text>
        
        <View style={styles.yayCard}>
            <Aligner direction="column">
                <SvgXml xml={yay()} />
                <Text style={styles.yayText}>Yay!!</Text>
            </Aligner>
        </View>

        <Spacer type="margin" position="bottom" customSize={20} />

        <Button
            title="Choose Plan!"
            color="gray"
            style={styles.button}
            onPress={() => navigation.navigate('SurveyResults', {activityId})}
        />

        <Spacer type="margin" position="bottom" customSize={20} />

        <Button
            title="Back to Group"
            color="gray"
            style={styles.button}
            onPress={() => navigation.navigate('SurveyResults')}
        />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  activity: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  data: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  yayCard: {
    height: 400,
    width: 305,
    backgroundColor: '#0BC9B9',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yayText: {
    fontSize: 40,
    color: 'white'
  }
});

export default ActivitySummary;