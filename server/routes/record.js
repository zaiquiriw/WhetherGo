const express = require("express")
require('isomorphic-fetch');
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const router = express.Router()
const redis = require("../redis");
let redisClient;

(async () => {
	redisClient = await redis.getConnection();
})();

// const fetch = require('node-fetch')
const baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
const apiKey = process.env.CROSS_KEY

function createCrossingRequest(location, date1, date2) {
	let uri = baseURL
	return baseURL + location + "/" + date1 + "/" + date2 + "?key=" + apiKey
}

const crossingBaseURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

// return weather data from 
router.get('/api/crossing/', async function (req, res) {
	const location = "seattle%20WA"
	const fullUrl = crossingBaseURL + location + "/today?unitGroup=us&key="+ process.env.CROSS_KEY + "&contentType=json&elements=temp,tempmin,tempmax,icon,datetime,feelslike&include=current";
	let isCached = false;
	let results;

	try {
		// TODO: need better location keys - use ones from API?
		// console.log(redis);
		const cachedResults = await redisClient.get(location);
		if (cachedResults) {
			isCached = true;
			results = JSON.parse(cachedResults);
		} else {
			let response = await fetch(fullUrl);
			if (response.status >= 400) {
				throw new Error("Bad response from server: " + response.status);
			}
			results = await response.json();
			await redisClient.set(location, JSON.stringify(results));
		}
		res.send(results);
	} catch (error) {
		console.log(error);
	}
})

module.exports = router;