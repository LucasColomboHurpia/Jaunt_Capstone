import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import createMap from '../components/mapTemplate';
import { CommonActions, useIsFocused } from "@react-navigation/native";
import * as Location from 'expo-location';

import {BackIcon, WalkIcon, BikeIcon, BusIcon, CarIcon} from '../../../../assets/icons/Icon'

export default function MapPage({ route, navigation }) {

  const isFocused = useIsFocused();

  useEffect(() => {
    if(navigation) {
        navigation.getParent().dispatch(state => {
            return CommonActions.reset({
                ...state,
                hidden: true,
              });
        })
          return () => navigation.getParent().dispatch(state => {
            return CommonActions.reset({
                ...state,
                hidden: false,
              });
            });
    }
  }, [isFocused]);

  const webRef = useRef();
  const [userCoords, setUserCoords] = useState(null);

  useEffect(() => {
    (async () => {
      const location = await getUserLocation();
      setUserCoords(location);
    })();
  }, []);

  async function getUserLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    return {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    };
  }

  const placeData = route.params?.item;
  const centerCoordinates = placeData?.apiResponse?.coordinates || { lat: 0, lng: 0 };

  const mapHtml = userCoords ? createMap(centerCoordinates, userCoords, placeData?.name) : '';

  const calculateRoute = (transportMethod) => {
    webRef.current.postMessage(transportMethod);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>{placeData?.name}</Text>
      </View>
      {userCoords && (
        <WebView
          ref={webRef}
          style={styles.map}
          originWhitelist={['*']}
          source={{ html: mapHtml }}
          javaScriptEnabled={true}
          onMessage={(event) => {
            const msgData = JSON.parse(event.nativeEvent.data);
            if (msgData.type === 'error') {
              console.log('Received error from WebView: ', msgData.data);
            } else if (msgData.type === 'position') {
              console.log('Received position from WebView: ', msgData.data);
            } else if (msgData.type === 'transportMethod') {
              console.log('Transport method: ', msgData.data);
            } else if (msgData.type === 'consoleLog') {
              console.log("LOG: ", msgData.data)
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '10%',
  },
  backButton: {
    paddingHorizontal: 10,
    fontSize: 20,
  },
  title: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: '70%',
  },
  buttons: {
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'grey',
  },
  buttonText: {
    color: 'white',
  },
});
