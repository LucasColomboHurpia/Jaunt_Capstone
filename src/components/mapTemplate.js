export default function createMap(centerCoordinates, placeName) { 
    console.log('the coordiantes are ',centerCoordinates)
    return `
    <div>
        <style>
                html, body {
                    margin: 0;
                }
  
                #map {
                    height: 100%;
                    width: 100%;
                }
        </style>
  
        <div id='map' class='map'></div>
  
        <!-- load TomTom Maps Web SDK from CDN -->
        <link rel='stylesheet' type='text/css' href='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps.css'/>
        <script src='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps-web.min.js'></script>
  
        <script>
            // create the map
            tt.setProductInfo('TomTom Maps React Native Demo', '1.0');
            let map = tt.map({
                key: 'SAs8GubigOjo4UwoTk7tG4sXMPosF8uU',
                container: 'map',
                center: [${centerCoordinates.lng}, ${centerCoordinates.lat}],
                zoom: 14
            });
  
            // Add a marker to the map at the specified location
            let marker = new tt.Marker().setLngLat([${centerCoordinates.lng}, ${centerCoordinates.lat}]).addTo(map);
  
            map.on('dragend', function() {
                let center = map.getCenter();
                window.ReactNativeWebView.postMessage(center.lng.toFixed(3) + ", " + center.lat.toFixed(3));
            })
  
            window.document.addEventListener('message', function(event) {
              let transportMethod = event.data;
  
              tt.services.calculateRoute({
                key: 'SAs8GubigOjo4UwoTk7tG4sXMPosF8uU',
                locations: ['-123.107508,49.224028', '${centerCoordinates.lng},${centerCoordinates.lat}'],
                travelMode: transportMethod,
              })
              .go()
              .then(function(response) {
                var geojson = response.toGeoJson();
                tt.L.geoJson(geojson).addTo(map);
              });
            });
        </script>
    </div>
    `;
  }
  