var customMongoDBWrapper = require("../mongodb-service/mongo_methods.js");

const express = require('express');

const postjobroute = express.Router();

postjobroute.get('/', (req, res) => { 

	console.log(req.query.jobid);
	console.log(req.query.email);
	

    const mongoClient = new customMongoDBWrapper();
	const alljobs =  mongoClient.postjobapp(req.query.jobid, req.query.email).then(
		result1 => {
			console.log(result1);
			res.setHeader('Access-Control-Allow-Origin', 'https://jobs-react-d150a.web.app');
			res.send(result1);
		}
	);

	//res.end() 
}) 

module.exports = postjobroute
