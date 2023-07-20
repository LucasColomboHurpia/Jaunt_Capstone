import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../../../shared-components/Button";
import Spacer from "../../../../shared-components/Spacer";

const LogoutScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Logout</Text>
      <Text style={styles.message}>Are you sure you want to log out?</Text>
      <View style={styles.buttonContainer}>
      <Spacer type="margin" position="bottom" customSize={20}>
          <Button variant="bg" type="secondary" text="Logout" onPress={handleLogout} />
        </Spacer>
          <Button
            variant="bg"
            type="secondary"
            text="Cancel"
            onPress={handleCancel}
          />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  message: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: "center",
  },
});

export default LogoutScreen;
