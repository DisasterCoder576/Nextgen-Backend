const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mpalanipsbb:psbbpalani@cluster0.wbznuhj.mongodb.net/?retryWrites=true&w=majority";
var ObjectId = require('mongodb').ObjectId;

module.exports = class customMongoDBWrapper{
  constructor(){
    this.client  = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
  }
  async getalljobs(skip){
    const database = this.client.db("jobservice");
    const alljobs = database.collection("alljobs");
    const cursor = alljobs.find({}).project({company:1,years_min:1, jobname:1, skills:1}).skip(parseInt(skip)).limit(5);
    const allValues = await cursor.toArray();
    //this.client.close();
    console.log(allValues);
    return allValues;
}
async getSpecificJob(jobid){
    const database = this.client.db("jobservice");
    const alljobs = database.collection("alljobs");
    var o_id = new ObjectId(jobid)
    const value = alljobs.findOne({"_id":o_id}, {applicants:0});
    //const allValues = await cursor.toArray();
    //this.client.close();
    return  value;
}

async postjobapp(jobid, email){
  const database = this.client.db("jobservice");
    const alljobs = database.collection("alljobs");
    var o_id = new ObjectId(jobid);
    const result =await alljobs.updateOne(
      {_id: o_id},
      { $addToSet: { applicants: email } }
    );
    console.log(result);
    if(result.acknowledged){
      const doc = {
        email: email,
        jobsapplied: [jobid]
      }
      const candidates = database.collection("candidates");
      const result = await candidates.updateOne(
        {email:email},
        {$addToSet: {jobsapplied: jobid}}
      )
      console.log(result);
      return {status:"success"};
    }
    else{
      return {status:"failure"};
    }
    }
}























// Create a MongoClient with a MongoClientOptions object to set the Stable API version

/*async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


client.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("jobservice");
    dbo.collection("alljobs").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
  });

  */
 /* const uri = "mongodb+srv://mpalanipsbb:psbbpalani@cluster0.wbznuhj.mongodb.net/?retryWrites=true&w=majority";
//
  async function main1(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */


    //const client = new MongoClient(uri);
 /*   const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        //await  listDatabases(client);
        await getalljobs(client);
        // postjob(client);

    } catch (e) {
        console.error(e);
        console.log(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`)
    );
};

 async function getalljobs1(client){
    const database = client.db("jobservice");
    const alljobs = database.collection("alljobs");
      cursor  = alljobs.find();
      result = []
    for await (const doc of cursor) {
        result.push(doc);
      }
    console.log(result);
}

function postjob(client){
    client.connect("mongodb+srv://mpalanipsbb:psbbpalani@cluster0.wbznuhj.mongodb.net/?retryWrites=true&w=majority"
    , function(err, db) {
        if (err) throw err;
        var dbo = db.db("jobservice");
        dbo.collection("alljobs").insertOne({
            name: 'O',
            age: 'O'
        }, 
        function(err, result) {
            if (err) throw err;
            //res.json(result);
            db.close();
        });
    });

}*/



 