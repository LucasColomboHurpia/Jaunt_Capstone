export default function createMap(centerCoordinates, placeName) {
    return `
      <div>
        <style>
          html, body {
            margin: 0;
          }
  
          #map {
            height: 80%; /* adjust this as needed */
            width: 100%;
          }
  
          /* styles for the buttons */
          .route-button {
            display: inline-block;
            padding: 80px;
            margin: 5px;
            background-color: grey;
            color: white;
            text-align: center;
            cursor: pointer;
          }
        </style>
  
        <div id='map' class='map'></div>
  
        <div id='route-buttons'>
          <div class='route-button pedestrian'>Walk</div>
          <div class='route-button bicycle'>Bike</div>
          <div class='route-button publicTransport'>Public</div>
          <div class='route-button car'>Car</div>
        </div>
  
        <link rel='stylesheet' type='text/css' href='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps.css'/>
        <script src='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps-web.min.js'></script>
        <script src='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/services/services-web.min.js'></script>
        
  
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
  
  
  
          function calculateRoute(transportMethod) {
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'consoleLog', data: "===============" }));
          
            try {
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'consoleLog', data: "Started calculateRoute" }));
              var routeLayer = 'route_' + Date.now();
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'consoleLog', data: "Created routeLayer: " + routeLayer }));
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'transportMethod', data: transportMethod }));
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'consoleLog', data: "About to call tt.services.calculateRoute()" }));
          
              tt.services.calculateRoute({
                key: 'SAs8GubigOjo4UwoTk7tG4sXMPosF8uU',
                locations: ['-123.107508,49.224028', '${centerCoordinates.lng},${centerCoordinates.lat}'],
                travelMode: transportMethod,
              }).then(response => {
                window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'consoleLog', data: "tt.services.calculateRoute result: " + JSON.stringify(response) }));
          
                // Removed response.go()
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
                    'line-color': 'blue',
                    'line-width': 10,
                  },
                });
          
              }).catch(error => {
                window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'consoleLog', data: "Error during 'calculateRoute' call: " + error.toString() }));
              });
          
            } catch (error) {
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'consoleLog', data: "Error calling calculateRoute function: " + error.toString() }));
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', data: error.toString() }));          
            }
          }
          
  
  
  
  
          
  
          function setupEventListeners() {
            document.querySelector('.route-button.pedestrian').addEventListener('click', function() {
              calculateRoute('pedestrian');
            });
            document.querySelector('.route-button.bicycle').addEventListener('click', function() {
              calculateRoute('bicycle');
            });
            document.querySelector('.route-button.publicTransport').addEventListener('click', function() {
              calculateRoute('publicTransport');
            });
            document.querySelector('.route-button.car').addEventListener('click', function() {
              calculateRoute('car');
            });
          }
  
          window.onload = setupEventListeners;
        </script>
      </div>
    `;
  }
  