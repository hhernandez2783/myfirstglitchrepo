// This isn't necessary but it keeps the editor from thinking L is a typo
/* global L */

var map = L.map('map').setView([38.500893,-98.745117], 5);

// Add base layer
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

// Fetch data from our Glitch project
fetch('https://data.nasa.gov/resource/y77d-th95.geojson')
  .then(function (response) {
    // Read data as JSON
    return response.json();
  })
  .then(function (data) {
    // Add data to the map
    var complaintData = L.geoJson(data, {
      onEachFeature: function (feature, layer) {
        // Add a popup to each feature
				var popupText = feature.properties.complaint_type;
				layer.bindPopup(popupText);
			}
    });
  
    var markers = L.markerClusterGroup({
      disableClusteringAtZoom: 12,
    });
    markers.addLayer(complaintData);
    map.addLayer(markers);
    map.fitBounds(complaintData.getBounds());
  });

