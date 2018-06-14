var map;
var markers = [];

//image from https://fallout4.wiki/images/layout/vault-boy-happy.png
var image = "vault-boy-happy-small.png"

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
var routeList = [AlewifeRoute, BraintreeRoute, AshmontRoute]

//initializes the map and draws the stations, then pathways
function initMap() {
    //intiMap mostly from https://developers.google.com/maps/documentation/javascript/geolocation#try-it-yourself
    map = new google.maps.Map(document.getElementById('map'), {
        center: redLineDict['South Station'],
        zoom: 14 
    });
    drawStations();
    for (var i in routeList) {
        drawPathways(routeList[i]);
    }
}
//takes json and adds each element as a marker location
function drawStations() {
    //push marker objects into array from https://developers.google.com/maps/documentation/javascript/markers
    for (i=0; i<redLine.length; i++) {
        markers.push(new google.maps.Marker({
            position: redLineDict[redLine[i].stop_name], 
            map: map,
            title: redLine[i].stop_name,
            icon: image
    }));
  }
}

//Takes a list of stop locations and draws a polyline between them
function drawPathways(routes) {
    //drawing a polyline from https://developers.google.com/maps/documentation/javascript/examples/polyline-simple
    var pathway = [];
    for (i = 0; i < routes.length; i++) {
        // console.log(redLineDict[routes[i]]);
        // console.log(pathway.push(redLineDict[routes[i]]));
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
