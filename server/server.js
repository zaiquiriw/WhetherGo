var express = require("express");
var qs = require('qs')

const app = express();
const port = 9999;
const cors = require('cors')
app.use(cors())
app.use(express.json())
const mongoose = require('mongoose')
require('dotenv').config()
app.set('query parser', function (str) {
  return qs.parse(str)
})

// setup redis connection
const redis = require('./redis');
(async () => {
	redis.getConnection();
})();

const User = require("./db/User")
const routes = require('./routes/record.js')

mongoose.set('strictQuery', false);

const source = process.env.ATLAS_URI;

mongoose.connect(
	source,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	() => {
		console.log("Connected to MongoDB")
	},
	e => console.error(e)
)

// Create a test account if it doesn't already exist
createTestUser()
async function createTestUser() {
	try {
		if (User.exists({ username: "testing-account", email: "test@utdallas.edu" })) {
			console.log("Default user exists")
		} else {
			const user = await User.create({
				username: "testing-account",
				age: 18,
				email: "test@utdallas.edu"
			})
			// const user = new User({ name: "Kyle", age: 26 })
			//user.save().then(() => console.log("User Saved"))
			console.log(user)
		}
	} catch (error) {
		console.log(error.message)
	}
}

app.use('/', routes)

//create a server object:
app.listen(port, () => {
	console.log("starting the server");
}); //the server object listens on port 8080