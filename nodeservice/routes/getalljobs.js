var customMongoDBWrapper = require("../mongodb-service/mongo_methods.js");

const express = require('express');

const getallroute = express.Router();

getallroute.get('/', (req, res) => { 


	const skip = req.query.skip;
    const mongoClient = new customMongoDBWrapper();
	const alljobs1 =  mongoClient.getalljobs(skip).then(
		result1 => {
			res.setHeader('Access-Control-Allow-Origin', 'https://jobs-react-d150a.web.app');
			res.send(result1);
		}
	);

	//res.end() 
}) 

module.exports = getallroute

