# mbta

In this lab we determined our own geolocation on the map using JavaScript objects.
Once the location was found we were to create an information window with the closest
Red Line station connected by a polyline and upon clicking it, the infowindow would tell you the upcoming trains. We used JSON and parsing to gather incoming data regarding the timing and location of each upcoming train and calculated the distance between two set Geopoints using the Haversine Formula. We used code given to us by stack overflow (http://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript) to calculate these distances.

Unfortunately I was unable to understand how to properly index all of the information regarding the schedule stops and through that was unable to display the content of each station. My initial thought was that a double for loop would all you to index into the content of the parsed in file, such as going from the TripList to the Trips to the Predictions to gathering information regarding the Stop ID Stop and Seconds but I strugled with implementing this idea logically speaking.

Collaborated with one Stamatios Aleiferis

Took approximately 7 hours.