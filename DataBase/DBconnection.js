const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; 

const dbName = 'AccessMasterControlServerDB';
const collectionName = 'TestCollection';

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