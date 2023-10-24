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