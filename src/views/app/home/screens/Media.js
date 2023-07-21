import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Alert, Linking } from "react-native";
import Text from "../../../../shared-components/Text";
import * as ImagePicker from "expo-image-picker";
import { CameraPlusIcon } from "../../../../assets/icons/Icon";
import SurveyContext from "../../../../context/SurveyContext";
import Button from "../../../../shared-components/Button";
import { CameraPlusIcon, BackIcon } from "../../../../assets/icons/Icon";

const MediaScreen = ({ route, navigation }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const { surveyData, setSurveyData } = useContext(SurveyContext)

  const activityId = route.params.activityId;

  const item = surveyData?.activityParameters?.find(
    (activity) => activity.id === activityId
  );

  console.log(item)

  useEffect(() => {
    if(selectedImages.length > 0) {
        const updatedActivityParameters = surveyData?.activityParameters?.map((activity) => {
            if(activity.id === activityId) {
                activity.images = selectedImages
            }
            return activity
        });

        const updatedSurveyData = {
            ...surveyData,
            activityParameters: updatedActivityParameters,
          };

        console.log('newData')
        console.log('=======================')
        console.log(updatedActivityParameters)

        setSurveyData(updatedSurveyData)
    }
  }, [selectedImages])

  const pickFromGallery = async () => {
    try {
      let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status === "granted") {
        let data = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: true,
          allowsEditing: false,
          aspect: [1, 1],
          quality: 0.5,
        });

        if (!data.cancelled) {
          setSelectedImages((prevImages) => [...prevImages, ...data.assets.map((asset) => asset.uri)]);
        }
      } else {
        Alert.alert("You need to give permission first");
      }
    } catch (error) {
      console.log("Error picking from gallery:", error);
    }
  };

  const pickFromCamera = async () => {
    try {
      let { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status === "granted") {
        let data = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5,
        });
        if (!data.cancelled) {
          setSelectedImages([...selectedImages, data.uri]);
        }
      } else {
        Alert.alert("You need to give permission first");
      }
    } catch (error) {
      console.log("Error picking from camera:", error);
    }
  };

  const removeImage = (index) => {
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleUploadButtonPress = () => {
    Alert.alert(
      "Upload/Take a photo",
      "Choose an option",
      [
        { text: "Upload", onPress: pickFromGallery },
        { text: "Take photo", onPress: pickFromCamera },
      ],
      { cancelable: true }
    );
  };



  // const handleDownload = async (uri) => {
  //   try {
  //     const supported = await Linking.canOpenURL(uri);
  //     if (supported) {
  //       await Linking.open(uri);
  //     } else {
  //       console.log("Cannot open URL:", uri);
  //     }
  //   } catch (error) {
  //     console.log("Error opening URL:", error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{flex: 1}}>
          <BackIcon />
        </TouchableOpacity>
        <Text variant="heading1" style={{flex: 1, textAlign: 'center'}}>Media</Text>
        <View style={{flex: 1}} /> 
      </View>
      <TouchableOpacity onPress={handleUploadButtonPress}>
        <View style={styles.rectangleContainer}>
          <View style={styles.mediaContainer}>
            <CameraPlusIcon />
            <Text>Upload/Take a photo</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {selectedImages.map((uri, index) => {
            console.log(uri)
          return (<View key={index} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.image} />
            <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(index)}>
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>)
        })}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: "white",
    shadowColor: "#000", // adding shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white", // changing color of text to white
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  imageWrapper: {
    position: "relative",
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "black",
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  rectangleContainer: {
    backgroundColor: '#0BC9B9',
    padding: 16,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10, // rounding borders
    marginTop: 10,
    shadowColor: "#000", // adding shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mediaContainer: {
    flexDirection: "column",
    alignItems: "center",
    color:'white'
  },
});

export default MediaScreen;
