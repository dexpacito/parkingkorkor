const { MongoClient } = require('mongodb');

async function updateParkingRate() {
  try {
    // Connect to the MongoDB database
    const uri = "mongodb+srv://e0957612:q1w2e3r4t5@carpark-pricing.jd2cdjm.mongodb.net/?retryWrites=true&w=majority"; // Update with your MongoDB connection string
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');

    // Access the carpark pricing collection
    const db = client.db('parkingkorkor'); // Replace 'your-database-name' with your actual database name
    const collection = db.collection('carpark-pricing');

    // Update the documents with agency other than "HDB"
    const filter = { Agency: { $ne: "HDB" } };
    const update = { $set: { "parking-rate-per-hour": "N/A" } };
    const result = await collection.updateMany(filter, update);

    console.log(`${result.modifiedCount} documents updated`);

    client.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error(error);
  }
}

updateParkingRate();
