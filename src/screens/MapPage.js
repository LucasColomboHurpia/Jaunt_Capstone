import React, { useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import createMap from '../components/mapTemplate';

export default function MapPage({ route }) {
  const webRef = useRef();

  const placeData = route.params?.item;
  const centerCoordinates = placeData?.apiResponse?.coordinates || { lat: 0, lng: 0 };

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
  },
  title: {
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

//car,truck,taxi,bus,van,motorcycle,bicycle,pedestrian
