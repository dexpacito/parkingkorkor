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
    try {
      const response = await axios.get(
        `http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2${searchTerm}`
      );
      const data = response.data;
      setSearchResults(data.results);
    } catch (error) {
      console.error("Error fetching carpark data: ", error);
    }
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
