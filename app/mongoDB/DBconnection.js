const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = "mongodb://" + process.env.DB_URL + ":" + process.env.DB_PORT; 

const dbName = process.env.DB_Name;
const collectionName = process.env.Collection_Name;

async function connectToDB() {
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    console.log('Connected to the database');
    client.close();
    console.log('Connection to the database closed');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

connectToDB();