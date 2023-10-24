var customMongoDBWrapper = require("..\\mongodb-service\\mongo_methods.js");

const express = require('express');

const postjobroute = express.Router();

postjobroute.get('/', (req, res) => { 
	//res.send('A simple Node App is '
	//	+ 'running on this server') 
	//console.log(req.params);

	console.log(req.query.jobid);
	console.log(req.query.email);
	
//	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//	res.send("HI1");
    const mongoClient = new customMongoDBWrapper();
	const alljobs =  mongoClient.postjobapp(req.query.jobid, req.query.email).then(
		result1 => {
			console.log(result1);
			res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
			res.send(result1);
		}
	);

	//res.end() 
}) 

module.exports = postjobroute