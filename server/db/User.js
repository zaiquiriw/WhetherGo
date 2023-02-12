const mongoose = require("mongoose")

const prefClimateSchema = new mongoose.Schema({
	feelslike: Number, //Default F
	temp: Number,
	dew: Number,
	humidity: Number,
	precip: Number,
	snow: Number,
	windspeed: Number,
	visibility: Number
})

const prefLocationsSchema = new mongoose.Schema({
	latitude: Number,
	longitude: Number,
	resolvedAddress: String,
	address: String,
	timezone: String,
	tzoffset: Number
})

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		lowercase: true
	},
	email: {
		type: String,
		required: true,
		lowercase: true
	},
	createdAt: {
		type: Date,
		default: () => Date.now(),
		immutable: true
	},
	updatedAt: {
		type: Date,
		default: () => Date.now()
	},
	age: Number,
	prefClimate: prefClimateSchema
})

module.exports = mongoose.model("User", userSchema)