var customMongoDBWrapper = require("../mongodb-service/mongo_methods.js");

const express = require('express');

const getspecificroute = express.Router();

getspecificroute.get('/', (req, res) => { 

    const mongoClient = new customMongoDBWrapper();
	const alljobs =  mongoClient.getSpecificJob(req.query.jobid).then(
		result1 => {
			console.log(result1);
			res.setHeader('Access-Control-Allow-Origin', 'https://jobs-react-d150a.web.app/');
			res.send(result1);
		}
	);

	//res.end() 
}) 

module.exports = getspecificroute
