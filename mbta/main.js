
var map;
var markers = [];
var quickRoute = null;
var targetStation = null;

//default location in case geolocation not active.
var yourLocation = {lat: 42.4082152, lng: -71.1162397};

//create info window variable
var infoWindow;

redLineUrl = "https://upload.wikimedia.org/wikipedia/commons/c/c5/Red_flag_waving.svg";
yourIconUrl = "https://fallout4.wiki/images/layout/vault-boy-happy.png";


//using https://csvjson.com/csv2json and https://cdn.mbta.com/MBTA_GTFS.zip
var redLine = [
    {
      "stop_id": "place-alfcl",
      "stop_name": "Alewife",
      "stop_lat": 42.395428,
      "stop_lon": -71.142483
    },
    {
      "stop_id": "place-andrw",
      "stop_name": "Andrew",
      "stop_lat": 42.330154,
      "stop_lon": -71.057655
    },
    {
      "stop_id": "place-asmnl",
      "stop_name": "Ashmont",
      "stop_lat": 42.284652,
      "stop_lon": -71.064489
    },
    {
      "stop_id": "place-brdwy",
      "stop_name": "Broadway",
      "stop_lat": 42.342622,
      "stop_lon": -71.056967
    },
    {
      "stop_id": "place-brntn",
      "stop_name": "Braintree",
      "stop_lat": 42.2078543,
      "stop_lon": -71.0011385
    },
    {
      "stop_id": "place-chmnl",
      "stop_name": "Charles/MGH",
      "stop_lat": 42.361166,
      "stop_lon": -71.070628
    },
    {
      "stop_id": "place-cntsq",
      "stop_name": "Central",
      "stop_lat": 42.365486,
      "stop_lon": -71.103802
    },
    {
      "stop_id": "place-davis",
      "stop_name": "Davis",
      "stop_lat": 42.39674,
      "stop_lon": -71.121815
    },
    {
      "stop_id": "place-dwnxg",
      "stop_name": "Downtown Crossing",
      "stop_lat": 42.355518,
      "stop_lon": -71.060225
    },
    {
      "stop_id": "place-fldcr",
      "stop_name": "Fields Corner",
      "stop_lat": 42.300093,
      "stop_lon": -71.061667
    },
    {
      "stop_id": "place-harsq",
      "stop_name": "Harvard",
      "stop_lat": 42.373362,
      "stop_lon": -71.118956
    },
    {
      "stop_id": "place-jfk",
      "stop_name": "JFK/UMass",
      "stop_lat": 42.320685,
      "stop_lon": -71.052391
    },
    {
      "stop_id": "place-knncl",
      "stop_name": "Kendall/MIT",
      "stop_lat": 42.36249079,
      "stop_lon": -71.08617653
    },
    {
      "stop_id": "place-nqncy",
      "stop_name": "North Quincy",
      "stop_lat": 42.275275,
      "stop_lon": -71.029583
    },
    {
      "stop_id": "place-pktrm",
      "stop_name": "Park Street",
      "stop_lat": 42.35639457,
      "stop_lon": -71.0624242
    },
    {
      "stop_id": "place-portr",
      "stop_name": "Porter",
      "stop_lat": 42.3884,
      "stop_lon": -71.119149
    },
    {
      "stop_id": "place-qamnl",
      "stop_name": "Quincy Adams",
      "stop_lat": 42.233391,
      "stop_lon": -71.007153
    },
    {
      "stop_id": "place-qnctr",
      "stop_name": "Quincy Center",
      "stop_lat": 42.251809,
      "stop_lon": -71.005409
    },
    {
      "stop_id": "place-shmnl",
      "stop_name": "Savin Hill",
      "stop_lat": 42.31129,
      "stop_lon": -71.053331
    },
    {
      "stop_id": "place-smmnl",
      "stop_name": "Shawmut",
      "stop_lat": 42.29312583,
      "stop_lon": -71.06573796
    },
    {
      "stop_id": "place-sstat",
      "stop_name": "South Station",
      "stop_lat": 42.352271,
      "stop_lon": -71.055242
    },
    {
      "stop_id": "place-wlsta",
      "stop_name": "Wollaston",
      "stop_lat": 42.2665139,
      "stop_lon": -71.0203369
    }
  ]
//parsing json into lat/long dict by station name
var redLineDict = {};
for (i = 0; i < redLine.length; i++) {
    redLineDict[redLine[i].stop_name] = {lat: redLine[i].stop_lat, lng: redLine[i].stop_lon};
};
console.log(redLineDict);
//listing all the routes to use for pathways
var AlewifeRoute = [
    "Alewife",
    "Davis",
    "Porter",
    "Harvard",
    "Central",
    "Kendall/MIT",
    "Charles/MGH",
    "Park Street",
    "Downtown Crossing",
    "South Station",
    "Broadway",
    "Andrew",
    "JFK/UMass"
]
var BraintreeRoute = [
    "JFK/UMass",
    "North Quincy",
    "Wollaston",
    "Quincy Center",
    "Quincy Adams",
    "Braintree"
]
var AshmontRoute = [
    "JFK/UMass",
    "Savin Hill",
    "Fields Corner",
    "Shawmut",
    "Ashmont"
]
var routeList = [AlewifeRoute, BraintreeRoute, AshmontRoute];

//initializes the map and calls drawing functions
function initMap() {
    infoWindow = new google.maps.InfoWindow();

    //intiMap mostly from https://developers.google.com/maps/documentation/javascript/geolocation#try-it-yourself
    map = new google.maps.Map(document.getElementById('map'), {
        center: redLineDict['South Station'],
        zoom: 14 
    });
    console.log('goigng to mapme');
    mapMe();
}


//takes json and adds each element as a marker location
function drawStations() {

    //icon formatting from https://stackoverflow.com/questions/32062849/modify-my-custom-marker-image-size-for-my-google-map
    redLineStationImage = {
        url: redLineUrl,
        scaledSize : new google.maps.Size(52, 62),
        anchor: new google.maps.Point(22,62)
    }
    
    //push marker objects into array from https://developers.google.com/maps/documentation/javascript/markers
    for (i=0; i<redLine.length; i++) {
        markers.push(new google.maps.Marker({
            position: redLineDict[redLine[i].stop_name], 
            map: map,
            title: redLine[i].stop_name,
            icon: redLineStationImage 
    }));
  }
}

//Takes a list of stop locations and draws a polyline between them
function drawPathways(routes) {
    //drawing a polyline from https://developers.google.com/maps/documentation/javascript/examples/polyline-simple
    var pathway = [];
    for (i = 0; i < routes.length; i++) {
        pathway.push(redLineDict[routes[i]]);
    }
    var routePath = new google.maps.Polyline({
        path: pathway,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map
    });
}
//this function gets your location, adds a marker, and then adds and removes bits of visual info on clicks
function mapMe() {
    //determine location and set global variable yourLocation
    //from https://developers.google.com/maps/documentation/javascript/geolocation
    //and https://github.com/tuftsdev/WebProgramming/blob/gh-pages/examples/google_maps/geolocation_map.html
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var yourLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            renderMap();
        });
    } else {
        renderMap();
    }
}
function renderMap() {
    drawStations();
    for (var i in routeList) {
        drawPathways(routeList[i]);
    }
    yourImage = {
      url: yourIconUrl,
      scaledSize: new google.maps.Size(92, 102),
      anchor: new google.maps.Point(67,102)
    }
    //create marker at yourLocation, with custom image
    yourMarker = new google.maps.Marker({
        position: yourLocation,
        map: map,
        title: 'Your Location',
        icon: yourImage
    });

    //pan to location
    setTimeout(function() { map.panTo(yourLocation); }, 1000);

    //infowindow click listeners
    //from https://github.com/tuftsdev/WebProgramming/blob/gh-pages/examples/google_maps/geolocation_map.html
    google.maps.event.addListener(yourMarker, 'click', function() {
        //find closest stop
        closestStop = findClosest();
        //set info window content
        infoWindow.setContent(
            "Closest to " + closestStop.sttnName + " Station, " + (closestStop.sttnDist*0.0006213712).toFixed(2) + " miles"
        );
        //check to see if this is already on the map.
        if (quickRoute) {
            //if true set vals to null
            quickRoute.setMap(null);
            targetStation.setMap(null);
        }
        //draw new polyline
        quickRoute = new google.maps.Polyline({
            path: [ yourLocation, closestStop.sttnLL ],
            geodesic: true,
            strokeColor: '#0378cf',
            strokeOpacity: 0.75,
            strokeWeight: 5,
            map: map
        })
        //draw circle over target station
        targetStation = new google.maps.Circle({
          strokeColor: '#4A7BC7',
          strokeOpacity: 0.85,
          strokeWeight: 2,
          fillColor: '#4A7BC7',
          fillOpacity: 0.55,
          map: map,
          center: closestStop.sttnLL,
          radius: 450
        })
        //pop up infoWindow for perusal
        infoWindow.open(map, yourMarker);
    });
    //polyline close on infowindow exit
    //from https://stackoverflow.com/questions/6777721/google-maps-api-v3-infowindow-close-event-callback
    google.maps.event.addListener(infoWindow, 'closeclick', function() {
        quickRoute.setMap(null);
        targetStation.setMap(null);
    });
}

function findClosest() {
  //for each in station list
  //find distance between marker and station
  //return shortest distance
  bestDist = null;
  var myLatLng = new google.maps.LatLng(yourLocation);
  for (stop in redLine) {
    var stopLatLng = new google.maps.LatLng(redLineDict[redLine[stop].stop_name]);
    var newDist = google.maps.geometry.spherical.computeDistanceBetween( myLatLng, stopLatLng);
    // console.log(newDist);
    if (newDist < bestDist || stop == 0) {
      bestDist = newDist;
      sttnInfo = {sttnIndex: stop, sttnName: redLine[stop].stop_name, sttnDist: bestDist, sttnLL: stopLatLng}; 
    }
  }
  // var returnInfo = "Closest to " + sttnName + " Station, " + (bestDist*0.0006213712).toFixed(2) + " miles";
  // console.log(returnInfo);
  // return returnInfo;
  return sttnInfo;
}
