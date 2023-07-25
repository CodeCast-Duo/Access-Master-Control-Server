const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.DB_URL; 

const dbName = process.env.DB_Name;
const collectionName = process.env.Collection_Name;

async function connectToDB() {
  try {
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    console.log('Connected to the database');

    // Example: Insert a document into the collection
    const collection = db.collection(collectionName);
    const document = { name: 'John Doe', age: 30 };
    await collection.insertOne(document);
    console.log('Document inserted successfully');

    client.close();
    console.log('Connection to the database closed');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

connectToDB();