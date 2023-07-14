import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const MediaScreen = ({ navigation }) => {
  const [selectedImages, setSelectedImages] = useState([]);

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
        { text: "Take a photo", onPress: pickFromCamera },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Media Screen</Text>
      <Button title="Upload/Take a photo" onPress={handleUploadButtonPress} color="grey"/>
      <View style={styles.imageContainer}>
        {selectedImages.map((uri, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri }} style={styles.image} />
            <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(index)}>
              <Text style={styles.removeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
});

export default MediaScreen;
