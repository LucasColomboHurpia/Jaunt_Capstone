import React, { useRef, useMemo } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import createMap from '../components/mapTemplate';

export default function MapPage({ route }) {
  let webRef = useRef();

  const placeData = route.params?.item;
  console.log('route.params',route.params)
  console.log(placeData)
  const centerCoordinates = placeData?.coordinates || { lat: 0, lng: 0 };

  // Create the map HTML with the received coordinates
  const mapHtml = useMemo(() => createMap(centerCoordinates, placeData?.name), [centerCoordinates, placeData?.name]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{placeData?.name}</Text>
      <WebView
        ref={webRef}
        style={styles.map}
        originWhitelist={['*']}
        source={{ html: mapHtml }}
      />
      <View style={styles.buttons}>
        <Button title="Walk" color= 'grey' onPress={() => {}}></Button>
        <Button title="Bike" color= 'grey' onPress={() => {}}></Button>
        <Button title="Public" color= 'grey' onPress={() => {}}></Button>
        <Button title="Car" color= 'grey' onPress={() => {}}></Button>
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
});
