import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MenuComponent from "../components/MenuComponent";

const GroupPage = (navigation) => {
  return (
    <View style={styles.container}>
      <MenuComponent navigation={navigation}></MenuComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GroupPage;