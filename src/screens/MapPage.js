import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import createMap from '../components/mapTemplate';

export default function MapPage({ route }) {
  const webRef = useRef();

  const placeData = route.params?.item;
  console.log('route.params', route.params)
  console.log(placeData)
  const centerCoordinates = placeData.item?.coordinates || { lat: 0, lng: 0 };

  // Create the map HTML with the received coordinates
  const mapHtml = createMap(centerCoordinates, placeData?.name);

  const calculateRoute = (transportMethod) => {
    webRef.current.postMessage(transportMethod);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{placeData?.name}</Text>
      <WebView
        ref={webRef}
        style={styles.map}
        originWhitelist={['*']}
        source={{ html: mapHtml }}
        javaScriptEnabled={true}
      />
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => calculateRoute("pedestrian")}>
          <Text style={styles.buttonText}>Walk</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => calculateRoute("bicycle")}>
          <Text style={styles.buttonText}>Bike</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => calculateRoute("publicTransport")}>
          <Text style={styles.buttonText}>Public</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => calculateRoute("car")}>
          <Text style={styles.buttonText}>Car</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  placeName: {
    height: '10%',
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
