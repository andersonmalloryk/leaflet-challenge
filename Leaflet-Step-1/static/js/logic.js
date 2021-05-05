console.log("reading logic.js")

// Create map object
var myMap = L.map("map", {
    center: [39.588, 2.935],
    zoom: 5
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

function createMarkers(response) {

    // // Pull the "stations" property off of response.data
    // var stations = response.data.stations;
  
    // // Initialize an array to hold bike markers
    // var bikeMarkers = [];
  
    // // Loop through the stations array
    // for (var index = 0; index < stations.length; index++) {
    //   var station = stations[index];
  
    //   // For each station, create a marker and bind a popup with the station's name
    //   var bikeMarker = L.marker([station.lat, station.lon])
    //     .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");
  
    //   // Add the marker to the bikeMarkers array
    //   bikeMarkers.push(bikeMarker);
    // }
  
    // // Create a layer group made from the bike markers array, pass it into the createMap function
    // createMap(L.layerGroup(bikeMarkers));
  }
  
  
  // Perform an API call to the USGS JSON to get earthquake information. Call createMarkers when complete
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);

// create map with leaflet to plot all earthquakes from data set

// adjust datamarkers to reflect magnitude of earthquake by size and depth of earthquake by color
// color should be larger for higher magnitude and darker for deeper depth (third coordinate for each earthquake)

// add a legend with the color scheme 

// PART TWO
// plot second data set on map from https://github.com/fraxen/tectonicplates
// add number of base maps to choose from (satellite, grayscale, outdoors)
// add layer controls map
