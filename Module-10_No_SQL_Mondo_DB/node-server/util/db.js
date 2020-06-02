const MongoClient = require('mongodb').MongoClient;
const dns = require('dns');

dns.setServers([
  '8.8.8.8',
]);
// Use a private variable to store a connection to the db;
let _db;

function mongoConnect(callback){
  const uri = `mongodb+srv://${process.env.MONGO_USRNAME}:${process.env.MONGO_PASS}@cluster0-lti9i.mongodb.net/store`;
  MongoClient.connect(uri, { 
    useUnifiedTopology: true,
    auto_reconnect: true
   })
  .then(client => {
    _db = client.db();
    callback();
  })
  .catch(err => {
    console.error("MONGO DB CONNECTION ERROR: ", err);
  });
};

function getDB(){
  if(_db){
    return _db;
  };

  throw "No Database found";
}

module.exports = {
  mongoConnect,
  getDB
}