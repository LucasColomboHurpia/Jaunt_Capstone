import React, { useState, useContext, useRef, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Text from "../../../../../shared-components/Text";
import Button from "../../../../../shared-components/Button";
import {
  BackIcon,
  BeefIcon,
  PicnicIcon,
  ItalianIcon,
  SushiBlack,
  BurguerBlack,
  PizzaBlack,
  OrientalIcon,
  MiddleEastIcon,
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
import { WeatherComponent } from "../WeatherComponent";

const positionData = [
  { top: "20%", left: "2%" },
  { top: "-3%", right: "0%" },
  { top: "45%", left: "5%" },
  { top: "30%", right: "-5%" },
  { bottom: "80%", left: "10%" },
  { bottom: "-2%", right: "-10%" },
  { bottom: "20%", right: "10%" },
  { top: "15%", left: "35%" },
  { bottom: "60%", right: "25%" },
  { top: "65%", left: "15%" },
  { bottom: "35%", right: "15%" },
  { top: "25%", left: "60%" },
  { bottom: "10%", left: "30%" },
  { top: "70%", right: "30%" },
  { bottom: "45%", left: "55%" },
  { top: "15%", right: "55%" },
];

const radiusData = [
  65, 75, 85, 55, 55, 60, 70, 85, 75, 85, 55, 55, 60, 70, 55, 55,
];

const foodOptions = [
  { name: "Steak", icon: <BeefIcon color="black" size={90} />, },
  { name: "Italian", icon: <ItalianIcon color="black" size={100}/>, },
  { name: "Sushi", icon: <SushiBlack color="black" size={90} />, },
  { name: "Burger", icon: <BurguerBlack color="black" size={100} />, iconSelected: <BurguerWhite size={90} /> },
  { name: "Pizza", icon: <PizzaBlack color="black" size={90} />, }, 
  {name: "Oriental Cuisine", icon: <OrientalIcon color="black" size={100} />, },
  { name: "Mediterranean", icon: <MiddleEastIcon color="black" size={90} />,  },
  { name: "Vegetables", icon: <VegetableIcon color="black" size={100} />, },
];
const activities =[
  { name: "Bowling", icon: <BowlingIcon color="black" size={90} />,  },
  { name: "Movie Theatre", icon: <PopcornIcon color="black" size={100} />,  },
  { name: "Beach", icon: <BeachIcon color="black" size={90} />, },
  { name: "Suspension Bridge", icon: <BridgeIcon color="black" size={100} />,  },
  { name: "Hiking", icon: <HikingIcon color="black" size={90} />, },
  { name: "Amusment Park", icon: <AmusementParkIcon color="black" size={100} />, },
  { name: "Night Club", icon: <NighClubIcon color="black" size={100} />,  },
  { name: "Karoke", icon: <KarokeIcon color="black" size={100} />,  },
  { name: "Arcade", icon: <ArcadeIcon color="black" size={90} />,  },
  { name: "Bouldering", icon: <BoulderingIcon color="black" size={100} />, },
];

const colors = {
  primary: "#F35F4B",
  secondary: "#19445A",
  accent: "#FFC928",
};

const ActivityItem = ({ icon }) => {
  return (
    <View style={styles.activityItem}>
      {icon}
    </View>
  );
};

const ActivityQuestion2 = ({ onAnswer, onGoBack, selectedCategory }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [displayedOptions, setDisplayedOptions] = useState([]);

  const selectedOptionsRef = useRef([]);

  useEffect(() => {
    const initialOptions = activities
      // .filter((activity) =>
      //   selectedCategory === "Do Both"
      //     ? true
      //     : selectedCategory === "Do Something"
      //     ? !activity.name.startsWith("Festival")
      //     : activity.name.startsWith("Festival")
      // )
      .slice(0, 7)
      .map((activity, index) => ({
        text: activity.name,
        icon: activity.icon,
        styles: positionData[index],
        radius: radiusData[index],
        backgroundColor: "#D1D0CE", 
      }));

    setDisplayedOptions(initialOptions);
  }, [selectedCategory]);
  useEffect(() => {
    selectedOptionsRef.current = selectedOptions;
  }, [selectedOptions]);

  const handleAnswerOptionClick = (option) => {
    const selectedOptions = selectedOptionsRef.current;
    if (selectedOptions.length >= 7) {
      return;
    }
    setSelectedOptions([...selectedOptions, option.text]);
    setDisplayedOptions((prevOptions) => {
      return prevOptions.map((opt) => {
        if (opt.text === option.text) {
          const colorIndex = selectedOptions.length % 4; 
          const color = Object.values(colors)[colorIndex];
          return {
            ...opt,
            backgroundColor: color, 
          };
        }
        return opt;
      });
    });
  };
  const handleSubmit = () => {
    onAnswer(selectedOptions, "Preferences");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Activity</Text>
      <Text style={styles.questionText}>Choose what sounds interesting!</Text>
      <View style={styles.answerOptionsContainer}>
        {displayedOptions.map((option) => (
          <TouchableOpacity
            key={option.text}
            style={[
              styles.answerOption,
              option.styles,
              {
                width: option.radius * 2,
                height: option.radius * 2,
                borderRadius: option.radius,
                backgroundColor: option.backgroundColor || "#D1D0CE",
              },
            ]}
            onPress={() => handleAnswerOptionClick(option)}
          >
            <ActivityItem icon={option.icon} text={option.text} />
          </TouchableOpacity>
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
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 32,
    marginTop: 35,
  },
  questionText: {
    marginBottom: 20,
  },
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
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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

  },

  
});

export default ActivityQuestion2;
