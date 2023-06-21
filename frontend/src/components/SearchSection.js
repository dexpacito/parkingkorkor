import React, { useState } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";
import { Input, Button, Flex } from "@chakra-ui/react";
import "./SearchSection.css";

const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchCarparks = async () => {
    try {
      const response = await axios.get(`/api/search`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error in fetching carpark data!", error);
    }
  };

  return (
    <div className="search-section-container">
      <Flex direction="column" alignItems="center">
        <Flex direction="row">
          <Input
            type="text"
            placeholder="Destination"
            value={searchTerm}
            onChange={handleChange}
            size="lg"
            mr={2}
          />
          <Button onClick={searchCarparks} colorScheme="blue" size="md">
            Search
          </Button>
        </Flex>
        <SearchResults carparkLocations={searchResults} />
      </Flex>
    </div>
  );
};

export default SearchSection;
