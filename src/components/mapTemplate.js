export default function createMap(centerCoordinates, placeName) {
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

      <link rel='stylesheet' type='text/css' href='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps.css'/>
      <script src='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps-web.min.js'></script>

      <script>
        tt.setProductInfo('TomTom Maps React Native Demo', '1.0');
        var map = tt.map({
          key: 'SAs8GubigOjo4UwoTk7tG4sXMPosF8uU',
          container: 'map',
          center: [${centerCoordinates.lng}, ${centerCoordinates.lat}],
          zoom: 14
        });

        let marker = new tt.Marker({ width: 70, height: 70 }).setLngLat([${centerCoordinates.lng}, ${centerCoordinates.lat}]).addTo(map);

        map.on('dragend', function() {
          var center = map.getCenter();
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'position', data: [center.lng.toFixed(3), center.lat.toFixed(3)] }));
        });

        window.document.addEventListener('message', function(event) {
          console.log('Received event: ' + event.data);
          var transportMethod = event.data;

          var routeLayer = 'route_' + Date.now();

          tt.services
            .calculateRoute({
              key: 'SAs8GubigOjo4UwoTk7tG4sXMPosF8uU',
              locations: ['-123.107508,49.224028', '${centerCoordinates.lng},${centerCoordinates.lat}'],
              travelMode: transportMethod,
            })
            .go()
            .then(function(response) {
              var geojson = response.toGeoJson();
              if (map.getLayer(routeLayer)) {
                map.removeLayer(routeLayer);
                map.removeSource(routeLayer);
              }
              map.addLayer({
                id: routeLayer,
                type: 'line',
                source: {
                  type: 'geojson',
                  data: geojson,
                },
                layout: {},
                paint: {
                  'line-color': '#FF0000',
                  'line-width': 3,
                },
              });
            })
            .catch(function(error) {
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', data: error.message }));
            });
        });
      </script>
    </div>
  `;
}
