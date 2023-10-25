var customMongoDBWrapper = require("../mongodb-service/mongo_methods.js");

const express = require('express');

const getallroute = express.Router();

getallroute.get('/', (req, res) => { 


	const skip = req.query.skip;
    const mongoClient = new customMongoDBWrapper();
	const alljobs1 =  mongoClient.getalljobs(skip).then(
		result1 => {
			res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
			res.send(result1);
		}
	);

	//res.end() 
}) 

module.exports = getallroute

