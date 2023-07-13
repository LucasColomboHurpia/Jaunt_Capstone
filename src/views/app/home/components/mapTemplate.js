export default function createMap(centerCoordinates, placeName) {
  return `
    <div>






    <style>
    html, body {
        margin: 0;
        height: 100%;
        overflow: hidden; /* prevents scrollbar from appearing during animation */
    }
    
    #map {
        position: absolute;
        top: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
        background-color: grey;
    }
    
    #route-buttons {
        position: absolute;
        bottom: 0px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        padding: 30px;
        border-radius: 50px;
        box-sizing: border-box;
        width: 90%;
        margin: auto;
        transition: bottom 0.5s ease-out; /* animate the movement */
        margin-bottom: 50px;
    }
    
    .route-button {
        display: inline-block;
        padding: 10px 30px;
        margin: 0 10px;
        background-color: grey;
        color: white;
        font-size: 50px;
        text-align: center;
        cursor: pointer;
        border-radius: 12px;
    }
    
    .route-button.active {
        background-color: rgba(243, 95, 75, 1);
    }
    
    #text-section {
        position: absolute;
        bottom: -350px; /* initially offscreen, adjusted for larger text size */
        left: 0;
        right: 0;
        background-color: white;
        padding: 30px;
        border-radius: 25px 25px 0 0;
        box-sizing: border-box;
        width: 90%;
        margin: auto;
        text-align: left;
        transition: bottom 0.5s ease-out; /* animate the movement */
    }
    
    #text-section p {
        margin: 20px 0; /* add some vertical spacing */
        font-size: 50px;
    }
    
    .line1{
      color: rgba(243, 95, 75, 1)
    }

    .line2{
      color: grey
    }
    
    #text-section .line3 {
      font-size: 40px;
    }
    
    #text-section .bold {
        font-weight: bold;
    }
    </style>
    
    <div id='map' class='map'></div>
    
    <div id='route-buttons'>
        <div class='route-button pedestrian'>Walk</div>
        <div class='route-button bicycle'>Bike</div>
        <div class='route-button publicTransport'>Public</div>
        <div class='route-button car'>Car</div>
    </div>
    
    <div id='text-section'>
        <p class="bold line1">N Minutes</p>
        <p class="bold line2">(9.3 km)</p>
        <p class="line3">Fastest route now due to traffic conditions</p>
    </div>
    
    <script>
    var routeButtons = document.querySelectorAll('.route-button');
    
    routeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // remove the active class from all buttons
            routeButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
    
            // add the active class to the clicked button
            this.classList.add('active');
    
            // move the rectangles
            document.querySelector('#route-buttons').style.bottom = '300px';
            document.querySelector('#text-section').style.bottom = '0';
        });
    });
    
    function updateText(line1, line2, line3) {
        document.querySelector('#text-section .line1').innerHTML = line1;
        document.querySelector('#text-section .line2').innerHTML = line2;
        document.querySelector('#text-section .line3').innerHTML = line3;
    }
    </script>










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
        let marker2 = new tt.Marker({ width: 70, height: 70 }).setLngLat([-123.107508,49.224028]).addTo(map);


        var lastRouteLayer;

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

            if (lastRouteLayer && map.getLayer(lastRouteLayer)) {
              map.removeLayer(lastRouteLayer);
              map.removeSource(lastRouteLayer);
            }

            lastRouteLayer = routeLayer;
        
            tt.services.calculateRoute({
              key: 'SAs8GubigOjo4UwoTk7tG4sXMPosF8uU',
              locations: ['-123.107508,49.224028', '${centerCoordinates.lng},${centerCoordinates.lat}'],
              travelMode: transportMethod,
            }).then(response => {
              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'consoleLog', data: "tt.services.calculateRoute result: " + JSON.stringify(response) }));

              var geojson = response.toGeoJson();
              map.addLayer({
                id: routeLayer,
                type: 'line',
                source: {
                  type: 'geojson',
                  data: geojson,
                },
                layout: {},
                paint: {
                  'line-color': 'rgba(243, 95, 75, 1)',
                  'line-width': 10,
                },
              });

              window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'consoleLog', data: "debug time: " + JSON.stringify(response.routes[0].summary.travelTimeInSecond) }));


              let travelTimeMinutes = Math.floor(response.routes[0].summary.travelTimeInSeconds / 60) + ' minutes';
              let travelDistanceKM = '('+(response.routes[0].summary.lengthInMeters / 1000).toFixed(3) + ' km)';

              updateText(travelTimeMinutes, travelDistanceKM, 'Fastest route now due to traffic conditions');

        
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
            calculateRoute('bus');
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
