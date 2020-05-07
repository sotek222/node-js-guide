const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


// Use a private variable to store a connection to the db;
let _db;

function mongoConnect(callback){
  MongoClient.connect(`mongodb+srv://${process.env.MONGO_USRNAME}:${process.env.MONGO_PASS}@cluster0-lti9i.mongodb.net/store?retryWrites=true&w=majority`)
  .then(client => {
    _db = client.db();
    callback();
  })
  .catch(err => {
    console.error("MONGO DB CONNECTION ERROR: ", err);
    throw err;
  });
};

function getDB(){
  if(db){
    return db;
  };

  throw "No Database found";
}

module.exports = {
  mongoConnect,
  getDB
}