"use strict";

window.onload = function() {
    googleMaps.initMap();     // onload to start the rendering of the map location
};

var googleMaps = {

    GEOcoder: null,
    map: {},

    initMap: function() {

        googleMaps.GEOcoder = new google.maps.Geocoder();
        googleMaps.map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 15,
                lng: 0
            },
            zoom: 3,
        });
        //googleMaps.maps.trigger(map, "resize");
    },

    //http://stackoverflow.com/questions/5984179/javascript-geocoding-from-address-to-latitude-and-longitude-numbers-not-working
    CreateGeolocation: function(label, geocoderItem) {

console.log("hej");
        // console.log(googleMaps.GEOcoder);
        var currentlabel = label.name;
        var currentadress = currentlabel.replace("Location/", "");
        // getting the catolog location  , replace it with empty string // will create one 

        googleMaps.GEOcoder.geocode({
            'address': currentadress,
        }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {

                console.log("hereee")
                var currentlocation = results[0].geometry.location;
                googleMaps.createmarker(currentlocation, currentadress, currentlabel, geocoderItem);
            }
            else {
                setTimeout(function() {
                    googleMaps.CreateGeolocation(googleMaps.newlabel, geocoderItem);
                }, 200);

                alert('Geocode was not successful for the following reason' + status);
            }
        });

    },
    // https://developers.google.com/maps/documentation/javascript/examples/geocoding-simple 
    // https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
    createmarker: function(location, newadress, label, geocoderItem) {    // create marker from the info i got from geolocation, adress, mail
        var marker = new google.maps.Marker({
            position: location,
            map: googleMaps.map,
            title: newadress,
            animation: google.maps.Animation.DROP,
        });

        //marker.addListener('click', googleMaps.toggleBounce);

        marker.addListener('click', function() {
            googleMaps.toggleBounce(marker);
            infoWindow.open(googleMaps.map, marker);
        });
        //console.log(googleMaps.map);
        var contentstring = '<h1>' + label + '</h1>' + newadress + '<p>location latitude: ' + location.lat() + '</p>' + '<p>location longitude' + location.lng() +'</p>'+'<b>'+geocoderItem.message+'</b>';
        console.log("vart är mappen");

        var infoWindow = new google.maps.InfoWindow({
            content: contentstring

        });
    },
    // toggle to get the bounce effect on google marker, somehow it cant find the point im click on, but start animation works.
    toggleBounce: function(marker) {

        console.log("animation wills start");
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        }
        else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    }
}