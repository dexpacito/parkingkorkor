const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 8080;

app.use(cors()); // Allow cross-origin requests

app.get('/api/search', async (req, res) => {
  try {
    // Connect to the MongoDB database
    const uri = "mongodb+srv://e0957612:q1w2e3r4t5@carpark-pricing.jd2cdjm.mongodb.net/?retryWrites=true&w=majority"; // Update with your MongoDB connection string
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');

    // Access the carpark pricing collection
    const db = client.db('parkingkorkor'); // Replace 'your-database-name' with your actual database name
    const collection = db.collection('carpark-pricing');

    // Retrieve the existing data from the database
    const existingData = await collection.find().toArray();
    console.log('Existing data retrieved from MongoDB');

    // If the database is empty, fetch data from the API and update the database
    if (existingData.length > 0) {
      let config = {
        method: 'get',
        maxContentLength: Infinity,
        headers: {
          'AccountKey': 'cy5dOtxoSLa65+OR1ZRZwA=='
        }
      };

      const consolidatedData = [];

      // Make API requests with different skip values
      for (let skip = 0; skip <= 2000; skip += 500) {
        config.url = `http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?$skip=${skip}`;
        const response = await axios.request(config);
        consolidatedData.push(...response.data.value);
        console.log('Data fetched from API');
      }

      // Update the database with the fetched data
      for (const carpark of consolidatedData) {
        const filter = { CarParkID: carpark.CarParkID };
        const update = { $set: carpark };
        await collection.updateOne(filter, update, { upsert: true });
      }

      console.log('Data added to MongoDB');

      // Retrieve the updated data from the database
      const updatedData = await collection.find().toArray();
      client.close();

      res.json(updatedData);
    } else {
      client.close();

      res.json(existingData);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log("App listening on port " + port);
});

module.exports = app;
