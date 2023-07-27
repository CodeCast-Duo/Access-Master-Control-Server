const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const url = "mongodb://" + process.env.DB_URL + ":" + process.env.DB_PORT;

const dbName = process.env.DB_Name;
const collectionName = process.env.Collection_Name;

const client = new MongoClient(url);;

/*MongoClient.connect(url, function(error, client) {
  if (err) {
    console.log('Error connecting to the database:', error);
  }
  console.log("Connected to the database");

  const db = client.db(dbName);

  // your CRUD operations go here...

  client.close();
});*/

try {
  client.connect();
  console.log("Connected to the database");
} catch (err) {
  console.log('Error connecting to the database:', error);
}

module.exports = {
  client
};