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

