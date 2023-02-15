// Initiate the leaflet map and set the main view.
var map = L.map('map').setView([43.0672, -89.4211], 11);

// Add the til layer or a base map layer.
var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    minZoom:2,
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3'],
    attribution:'Data Source:  <a href="https://www.google.com/maps" target=_blank>  <a href=" Google Map"> Google Map </a></a>| Mapped By: Abdullah Ameen' }).addTo(map);

    var masjid = new L.Icon({iconUrl:'img/Masjid.png',
    iconSize: [72, 55],

});

// Add the GeoJason file and read the popup function (masjidata)
var geojason = L.geoJSON(masjidsinwisconsin, {
    onEachFeature:masjidata,
}).addTo(map);


// Add the popup using a function
function masjidata(feature, layer){
    layer.bindPopup("<p class = 'header'>" + feature.properties.MasjidName + "</p>" + 
    "<span class='headings'>Address : </span>" + feature.properties.Address + "<br>"
    + "<span class='headings'>Contact : </span>" + feature.properties.Contact + "<br>"
     + "<span class='headings'>Prayer Time: </span>" + feature.properties.Prayertime + "<br>"
     + "<span class='imagemasjid'></span>" + feature.properties.Image 
     );
//Set the custom Icone for masjids
     layer.setIcon(masjid);
};


  L.Control.textbox = L.Control.extend({
		onAdd: function(map) {
			
		var text = L.DomUtil.create('div');
		text.id = "info_text";
		text.innerHTML = "<span>Masjids or Islamic Centers in Wisconsin</span>"
		return text;
		},

		onRemove: function(map) {
			// Nothing to do here
		}
	});
	L.control.textbox = function(opts) { return new L.Control.textbox(opts);}
	L.control.textbox({ position: 'topright' }).addTo(map);



// Add the Leaflet Geocoder
var geocoder = L.Control.geocoder({
  defaultMarkGeocode: false
})
  .on('markgeocode', function(e) {
    var bbox = e.geocode.bbox;
    var poly = L.polygon([
      bbox.getSouthEast(),
      bbox.getNorthEast(),
      bbox.getNorthWest(),
      bbox.getSouthWest()
    ]).addTo(map);
    map.fitBounds(poly.getBounds());
  })
  .addTo(map);


// Adding the scale
L.control.scale({imperial: false}).addTo(map);