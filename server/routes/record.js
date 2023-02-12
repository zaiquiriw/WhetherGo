const express = require("express")
require('isomorphic-fetch');
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const router = express.Router()

require('isomorphic-fetch')
const baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
const apiKey = process.env.CROSS_KEY

function createCrossingRequest(location, date1, date2) {
	let uri = baseURL
	return baseURL + location + "/" + date1 + "/" + date2 + "?key=" + apiKey
}

<<<<<<< HEAD
router.use((req, res, next) => {
	console.log('Time: ', new Date().toISOString())
	next()
=======
const crossingBaseURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

// return weather data from 
router.get('/api/crossing/', function (req, res) {
	let location = "seattle%20WA"
	let fullUrl = crossingBaseURL + location + "/today?unitGroup=us&key="+ process.env.CROSS_KEY + "&contentType=json&elements=temp,tempmin,tempmax,icon,datetime,feelslike&include=current"
	
	fetch(fullUrl)
		.then((res) => {
			if (res.status >= 400) {
					throw new Error("Bad response from server");
			}
			return res.json();
		})
		.then((data) => res.send(data));
>>>>>>> 47716d4c5ca58956ed7c1085c352770d69568d57
})

module.exports = router;
