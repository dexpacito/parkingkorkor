const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/api/search', async(req, res) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2',
        headers: { 
          'AccountKey': 'cy5dOtxoSLa65+OR1ZRZwA=='
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
