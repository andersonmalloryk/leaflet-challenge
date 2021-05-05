console.log("reading logic.js")

function createMap(earthquakeLocations) {
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Light Map": lightmap
  }

  var overlayMaps = {
    "Earthquake Locations": earthquakeLocations
  }

  var myMap = L.map("mapid", {
    center: [15.5994, -28.6731],
    zoom: 2,
    layers: [lightmap, earthquakeLocations]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

function createCircles(response) {

    // Pull the "stations" property off of response.data
    var quakes = response.features;
    // console.log(quakes[0].geometry.coordinates)
  
    // Initialize an array to hold bike markers
    var quakeLocations = [];
  
    // Loop through the stations array
    for (var index = 0; index < quakes.length; index++) {

      var quake = quakes[index];
      //console.log(quake.geometry.coordinates[0], quake.geometry.coordinates[1])
  
      // For each earthquake, create a marker and bind a popup with the station's name
      var quakeCircle = L.circle([quake.geometry.coordinates[0], quake.geometry.coordinates[1]], 
        {fillOpacity: 0.75,
        fillColor: "blue",
        radius: quake.properties.mag * 50000
      }).bindPopup("<h3>" + quake.properties.place + "<h3><h3> Magnitude: " + quake.properties.mag + "</h3>");
  
      // Add circles to the array
      quakeLocations.push(quakeCircle);
    }
  
    // Create a layer group made from the quake location array, pass it into the createMap function
    createMap(L.layerGroup(quakeLocations));
}

// Perform an API call to the USGS JSON to get earthquake information. Call createMarkers when complete
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createCircles);

// adjust datamarkers to reflect magnitude of earthquake by size and depth of earthquake by color
// color should be larger for higher magnitude and darker for deeper depth (third coordinate for each earthquake)

// add a legend with the color scheme 

// PART TWO
// plot second data set on map from https://github.com/fraxen/tectonicplates
// add number of base maps to choose from (satellite, grayscale, outdoors)
// add layer controls map
