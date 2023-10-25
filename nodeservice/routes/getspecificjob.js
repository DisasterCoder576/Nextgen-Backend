var customMongoDBWrapper = require("../mongodb-service/mongo_methods.js");

const express = require('express');

const getspecificroute = express.Router();

getspecificroute.get('/', (req, res) => { 
	//res.send('A simple Node App is '
	//	+ 'running on this server') 
	//console.log(req.params);
	console.log(req.query.jobid);

	//res.send("HI1");
    const mongoClient = new customMongoDBWrapper();
	const alljobs =  mongoClient.getSpecificJob(req.query.jobid).then(
		result1 => {
			console.log(result1);
			res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
			res.send(result1);
		}
	);

	//res.end() 
}) 

module.exports = getspecificroute
