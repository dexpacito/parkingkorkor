import React, { useState } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";

const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchCarparks = async () => {
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
      console.error("Error in fetching carpark data!");
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <button onClick={searchCarparks}>Search</button>
      <SearchResults carparkLocations={searchResults} />
    </div>
  );
};

export default SearchSection;
