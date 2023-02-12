const { application } = require("express")
const express = require("express")

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const router = express.Router()

// const fetch = require('node-fetch')
const baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'
const apiKey = process.env.CROSS_KEY

function createCrossingRequest(location, date1, date2) {
	let uri = baseURL
	return baseURL + location + "/" + date1 + "/" + date2 + "?key=" + apiKey
}

router.get('/api/crossing/', function (req, res) {
	res.send(req.query.abc)
})

module.exports = router;