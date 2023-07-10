const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = 8080;

app.use(cors());

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

    // Fetch the "parking-rate-per-hour" data from the database
    const parkingRates = await collection.find({}, { projection: { _id: 0, CarParkID: 1, 'parking-rate-per-hour': 1 } }).toArray();
    console.log('Parking rates retrieved from MongoDB');

    const consolidatedData = [];

    // Make API requests with different skip values
    let config = {
      method: 'get',
      maxContentLength: Infinity,
      headers: {
        'AccountKey': 'cy5dOtxoSLa65+OR1ZRZwA=='
      }
    };

    for (let skip = 0; skip <= 2000; skip += 500) {
      config.url = `http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?$skip=${skip}`;
      const response = await axios.request(config);
      consolidatedData.push(...response.data.value);
      console.log('Data fetched from API');
    }

    // Merge the data from API and MongoDB
    const mergedData = consolidatedData.map(carpark => {
      const parkingRate = parkingRates.find(rate => rate.CarParkID === carpark.CarParkID);
      return { ...carpark, 'parking-rate-per-hour': parkingRate ? parkingRate['parking-rate-per-hour'] : null };
    });

    client.close();

    // Return the merged data as the API response
    res.json(mergedData);
    console.log('Data returned to client.')
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log("App listening on port " + port);
});

module.exports = app;