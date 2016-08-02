// Your JavaScript goes here...
var request = new XMLHttpRequest();
	function parse() {

		request.open("GET", "data.json", true);

		request.onreadystatechange = function() {
		if (request.readyState == 4 && request.status == 200) {
			console.log("Got the data back!");
			data = request.responseText;
			console.log(data);
			msg = JSON.parse(data);
			elem = document.getElementById("messages");
			var msg_out = "";
			for(i = 0; i < msg.length; i++){
			msg_out = msg_out + "<p>" + msg[i].content + " " + msg[i].username + "</p>" ;
			}
			elem.innerHTML = msg_out;
		}
		else if (request.readyState == 4 && request.status != 200) {
			// think 404 or 500
			document.getElementById("messages").innerHTML = "<p>Whoops, something went terribly wrongo</p>";
		}
		else {
			console.log("In progress...");
		}
	};

	request.send(null);
	// data = request.responseText;
	
	// console.log("Got data");
	// console.log(data);


	// var msg = JSON.parse(data);
	// elem = document.getElementById("messages");
	// var msg_out = "";

	// for(i = 0; i < msg.length; i++){
	// msg_out = msg_out + "<p>" + msg[i].content + " " + msg[i].username + "</p>" ;
	// }
	// elem.innerHTML = msg_out;
}