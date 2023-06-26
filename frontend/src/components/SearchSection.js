import React, { useState } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";
import { Input, Button, Flex, Text } from "@chakra-ui/react";
import "./SearchSection.css";

const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchCarparks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://parkingkorkor-backend-h8n19on98-dexpacito.vercel.app/api/search`)
      .then(res => {setSearchResults(response.data)});
    } catch (error) {
      console.error("Error in fetching carpark data!", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-section-container">
      <Flex direction="column" alignItems="center">
        <Flex direction="row">
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
            size="lg"
            mr={2}
          />
          <Button onClick={searchCarparks} colorScheme="blue" size="md">
            Search
          </Button>
        </Flex>
        {loading ? (
          <Text mt={4} fontSize="lg">
            Getting Data...
          </Text>
        ) : (
          <SearchResults carparkLocations={searchResults} />
        )}
      </Flex>
    </div>
  );
};

export default SearchSection;
