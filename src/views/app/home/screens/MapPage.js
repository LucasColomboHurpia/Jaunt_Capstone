import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import createMap from '../components/mapTemplate';
import { CommonActions, useIsFocused } from "@react-navigation/native";


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

  const placeData = route.params?.currentActivity;
  const centerCoordinates = placeData?.coordinates || { lat: 0, lng: 0 };

  const mapHtml = createMap(centerCoordinates, placeData?.activityName);

  const calculateRoute = (transportMethod) => {
    webRef.current.postMessage(transportMethod);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>{placeData?.activityName}</Text>
      </View>
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
