// Requiring module
/*var customMongoDBWrapper = require(".\\mongodb-service\\mongo_methods.js");

const express = require('express');
// Creating express object
const app = express();


// Handling GET request
 app.get('/getalljobs', (req, res) => { 
	//res.send('A simple Node App is '
	//	+ 'running on this server') 

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


app.get('/getSpecificJob', (req, res) => { 
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


app.get('/postjobapp', (req, res) => { 
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

// Port Number
const PORT = process.env.PORT ||5000;

// Server Setup
app.listen(PORT,console.log(
`Server started on port ${PORT}`));

*/

const express = require("express");
const bodyParser = require("body-parser")

const getallrouter = require("./routes/getalljobs");
const getspecificrouter = require("./routes/getspecificjob");
const postjobrouter = require("./routes/postjobapp");


const HOST_NAME = "localhost";

const app = express();


app.use("/getalljobs", getallrouter);
app.use("/getSpecificJob", getspecificrouter);
app.use("/postjobapp", postjobrouter);


// Port Number
const PORT = process.env.PORT ||5000;

// Server Setup
app.listen(PORT,console.log(
`Server started on port ${PORT}`));