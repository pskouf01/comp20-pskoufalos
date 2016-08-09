// map.js
// By: Panos Skoufalos
// Date: Sunday, July 24, 2016

function init() {	var stations = '[{"name": "South Station", "lng": -71.0552400000001, "lat": 42.352271},{"name": "Andrew", "lng": -71.057655, "lat": 42.330154},{"name": "Porter Square", "lng": -71.11914899999999, "lat": 42.3884  },{"name": "Harvard Square", "lng": -71.118956, "lat": 42.373362 },{"name": "JFK/UMass", "lng": -71.052391, "lat": 42.320685},{"name": "Savin Hill", "lng": -71.053331, "lat": 42.31129},{"name": "Park Street", "lng": -71.0624242, "lat": 42.35639457},{"name": "Broadway", "lng": -71.056967, "lat": 42.342622 },{"name": "North Quincy", "lng": -71.029583, "lat": 42.275275 },{"name": "Shawmut", "lng": -71.06573796000001, "lat": 42.29312583 },{"name": "Davis", "lng":-71.121815, "lat": 42.39674},{"name": "Alewife", "lng": -71.142483, "lat": 42.395428 },{"name": "Kendall/MIT", "lng": -71.08617653, "lat": 42.36249079},{"name": "Charles/MGH", "lng": -71.070628, "lat": 42.361166},{"name": "Downtown Crossing", "lng": -71.060225, "lat": 42.355518 },{"name": "Quincy Center", "lng": -71.005409, "lat": 42.251809 },{"name": "Quincy Adams", "lng": -71.007153, "lat": 42.233391 },{"name": "Ashmont", "lng": -71.06448899999999, "lat": 42.284652},{"name": "Wollaston", "lng": -71.0203369, "lat": 42.2665139 },{"name": "Fields Corner", "lng": -71.061667, "lat": 42.300093 },{"name": "Central Square", "lng": -71.103802, "lat": 42.365486 },{"name":"Braintree", "lng":-71.0011385, "lat": 42.2078543 }]';
	
	// JSON parse station information	
	var output = JSON.parse(stations);
	
	
	var myOptions = {
		zoom: 13, 
		center: output[0],
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	// set up map
	var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	// create 3 arrays
	var stations = [] // one for the stations location
	var info_for_window = []; // one for the information portrayed per station
	var marker_for_station = []; // the marker for each station

	// for loop sets up map and info windows per station
	for (var i = 0; i < output.length; i++) {
		station = new google.maps.LatLng(output[i].lat, output[i].lng)
		stations.push(station); // create stations array

		var marker = new google.maps.Marker({ // create markers
			position: stations[i],
			icon: 'pin.png',
			title: output[i].name
		});

		marker.setMap(map); // set marker
		marker_for_station.push(marker); // store marker

		var infowindow = new google.maps.InfoWindow({ // create info window
			content: output[i].name
		});

		info_for_window.push(infowindow); // store infowindow

		google.maps.event.addListener(marker, 'click', function() {
			//infowindow.setContent(this.marker);
			infowindow.open(map, this);
		});		
	};

	// polylines
	var correct_path_coordinates = [
	{lat: output[11].lat, lng: output[11].lng },
	{lat: output[10].lat,lng: output[10].lng },
	{lat: output[2].lat, lng: output[2].lng },
	{lat: output[3].lat, lng: output[3].lng},
	{lat: output[20].lat, lng: output[20].lng},
	{lat: output[12].lat, lng: output[12].lng},
	{lat: output[13].lat, lng: output[13].lng},
	{lat: output[6].lat, lng: output[6].lng},
	{lat: output[14].lat, lng: output[14].lng},
	{lat: output[0].lat, lng: output[0].lng},
	{lat: output[7].lat, lng: output[7].lng},
	{lat: output[1].lat, lng: output[1].lng},
	{lat: output[4].lat, lng: output[4].lng}					
	];  

	var red_line_path1 = new google.maps.Polyline({
      path: correct_path_coordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

	var correct_path_coordinates_first_split = [
	{lat: output[4].lat, lng: output[4].lng},					
	{lat: output[5].lat, lng: output[5].lng},					
	{lat: output[19].lat, lng: output[19].lng},					
	{lat: output[9].lat, lng: output[9].lng},					
	{lat: output[17].lat, lng: output[17].lng}
	];

	var red_line_path2 = new google.maps.Polyline({
	  path: correct_path_coordinates_first_split,
	  geodesic: true,
	  strokeColor: '#FF0000',
	  strokeOpacity: 1.0,
	  strokeWeight: 2
    });

	var correct_path_coordinates_second_split = [
	{lat: output[4].lat, lng: output[4].lng},					
	{lat: output[8].lat, lng: output[8].lng},					
	{lat: output[18].lat, lng: output[18].lng},					
	{lat: output[15].lat, lng: output[15].lng},					
	{lat: output[16].lat, lng: output[16].lng},
	{lat: output[21].lat, lng: output[21].lng}
	];


    var red_line_path3 = new google.maps.Polyline({
      path: correct_path_coordinates_second_split,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    red_line_path1.setMap(map);
    red_line_path2.setMap(map);   
    red_line_path3.setMap(map);
	
//*******************************************************************//

	var request = new XMLHttpRequest();

	request.open("GET", "https://sheltered-forest-5520.herokuapp.com/redline.json", true); // read in data
	request.onreadystatechange = station_times;
	request.send(null);

	function station_times() {
		if (request.readyState == 4 && request.status == 200) { //register that it opens
			red = request.responseText;  // get info
			output_for_stations = JSON.parse(red);  // actually parse it and store in a variable
			
			trip_list = output_for_stations.TripList; // holds trip list
			current_time = trip_list.CurrentTime; //holds current time
			// Line = trip_list.Line; // holds that its the red line
			trips = trip_list.Trips; // holds Trips

			for (var i = 0; i < trips.length; i++) { //search aray of Trips 
				destination_of_train = trip_list.Trips[i].Destination;
				for(j = 0; j < trips[i].Predictions.length; j ++){ //now search through predictions
					current_station = trip_list.Trips[i].Predictions[j].Stop; // find your current stop
					station = infowindow_retriever(output, current_station); // get the index of the station
					content_for_station = info_for_window[station].content;

					infowindow_station = content_for_station + " Train to: " + destination_of_train + " arrives in: " + trip_list.Trips[i].Predictions[j].Seconds + " seconds";

					//info_for_window[station].setContent(infowindow_station);

					console.log("INFOWINDOW FOR : "+ infowindow_station)

					google.maps.event.addListener(marker_for_station[station], 'click', function() {
						info_for_window[station].setContent(infowindow_station);
						infowindow.open(map, this);
					});
					
				}

			};
		}
	}


 // Finding My Location 
	myLat = 0;
	myLng = 0;

	navigator.geolocation.getCurrentPosition(function(position) {

	myLat = position.coords.latitude;
	myLng = position.coords.longitude;

 	var myLatLng = {lat: myLat, lng: myLng};

	console.log(myLatLng);

	// creating my marker
	var my_loc_marker = new google.maps.Marker({
	    position: myLatLng,
	    icon: "my_loc.png", 
	    map: map,
		title: "Closest station: " + output[min].name + "\n" +
					   "Distance: " + min + " miles"
	});

	// creating infowindow for my location
	var location_info = [];
	var location_of_infowindow = new google.maps.InfoWindow({
		content: "my location"
	});
	

	my_loc_marker.setMap(map); // set my location
	location_info.push(location_of_infowindow); // push infowindow
	google.maps.event.addListener(my_loc_marker, 'click', function() {
	location_of_infowindow.setContent(this.title); // set content
	location_of_infowindow.open(map, this);// and allow it to show up

	});	

	// Finding closest station
	var coordinates_to_closest_station = [
		{lat: myLat, lng: myLng}, // my coordinates
		{lat: output[min].lat, lng: output[min].lng}, // calculated closest station coordinates
	];

	//set polyline from current location to closest MBTA Red Line station
	var path_user_to_closest_station = new google.maps.Polyline({
	path: coordinates_to_closest_station,
	geodesic: true,
	strokeColor: '#00FFFF',
		strokeOpacity: 1.0,
		strokeWeight: 2
	});
	path_user_to_closest_station.setMap(map);	
	});


	var stop_distances = []; // array to compare distances
	//find closest station
	//calculate all stop_distances from current location to the 21 stations of the red line
	for (s = 0; s < output.length; s++){ 
		console.log(s)
		var R = 6371; //radius of Earth in km
		var f1 = myLat * (Math.PI / 180);
	 	var f2 = output[s].lat * (Math.PI / 180);
		var Df = (output[s].lat-myLat) * (Math.PI / 180);
		var Dl = (output[s].lng-myLng) * (Math.PI / 180);
		var a = Math.sin(Df/2) * Math.sin(Df/2) + Math.cos(f1) * Math.cos(f2) *	Math.sin(Dl/2) * Math.sin(Dl/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;	//distance from each station in km
		stop_distances.push(d);
		console.log(d)
		
	}

	// calculating minimum distance 
	var min = 0;
	var min_distance = stop_distances[0];
	for (k = 1; k < stop_distances.length; k++){
		if (stop_distances[k] > min_distance) {
			min_distance = stop_distances[k];
			min = k;
			console.log("closest stop is" + output[min].name)
			//console.log("min idx is" + min)
		}
	}
}	




// retrieves index for specific infowindow
	function infowindow_retriever(output, current_station)
	{
		for(i = 0; i < output.length ; i++){
			if (current_station == output[i].name){
				return i;
			}
		}
	}
