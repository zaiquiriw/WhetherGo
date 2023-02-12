const mongoose = require('mongoose')
require('isomorphic-fetch');

// const uri = env.process.ATLAS_URL

fetch('https://google.com')
	.then(res => res.text())
	.then(text => console.log(text));