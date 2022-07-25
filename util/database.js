const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  // The "shop" part of the url is the database you want to connect
  MongoClient.connect(
    "mongodb+srv://node-user:nodecomplete@cluster0.p1tfc.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected!");
      // We will connect to the default database in the connection string
      // We could overwrite it like client.db('users') for example
      _db = client.db(); 
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
