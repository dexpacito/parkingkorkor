const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors()); // Allow cross-origin requests

app.get('/api/search', async (req, res) => {
  let config = {
    method: 'get',
    maxContentLength: Infinity,
    headers: {
      'AccountKey': 'cy5dOtxoSLa65+OR1ZRZwA=='
    }
  };

  let consolidatedData = []; // Array to store the consolidated data

  try {
    // Make API requests with different skip values
    for (let skip = 0; skip <= 2000; skip += 500) {
      config.url = `http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?$skip=${skip}`;
      const response = await axios.request(config);
      consolidatedData = consolidatedData.concat(response.data.value);
    }

    res.json(consolidatedData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(port, () => {
  console.log("App listening on port " + port);
});

module.exports = app;
