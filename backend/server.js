const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors()); // Allow cross-origin requests

app.get('/api/search', async (req, res) => {
  let config = {
    method: 'get',
    maxContentLength: Infinity,
    url: 'http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2',
    headers: {
      'AccountKey': 'cy5dOtxoSLa65+OR1ZRZwA=='
    }
  };

  try {
    const response = await axios.request(config);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data');
  }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});