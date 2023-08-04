import React, { useContext, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Text from '../../../../shared-components/Text';
import Button from '../../../../shared-components/Button';
import Spacer from '../../../../shared-components/Spacer';
import Aligner from '../../../../shared-components/Aligner';
import yay from '../../../../assets/icons/yay';
import SurveyContext from '../../../../context/SurveyContext';

const ActivitySummary = ({ route, navigation }) => {
  const { activityId } = route.params; // Get the activityId from the route params
  const { currentActivity } = useContext(SurveyContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text variant="heading1" style={styles.activity}>{currentActivity.name}</Text>
        <Spacer type="margin" position="bottom" customSize={30} />

        <View>
            <Aligner direction="column">
                <SvgXml xml={yay()} />
                <Spacer type="margin" position="bottom" customSize={30} />
                <Text variant="heading1" style={styles.yayText}>Yay!</Text>
            </Aligner>
            <Text style={styles.subtitle}>You are closer to setting your plan!</Text>
        </View>

        <Spacer type="margin" position="bottom" customSize={50} />

        <Button
            variant="sm"
            text="Choose Plan!"
            type="primary"
            onPress={() => navigation.navigate('ActivitySurveyResults')}
        />
        <Button
            variant="sm"
            text="Back to Group"
            type="secondary"
            style={styles.button}
            onPress={() => navigation.navigate('SurveyResults')}
        />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    flex: 1,
    backgroundColor: 'white',

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
    textAlign: 'center',
    flexWrap: "wrap",
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
    color: '#0BC9B9'
  }
});

export default ActivitySummary;