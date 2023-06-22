import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Input, Flex } from "@chakra-ui/react";
import SearchResults from "../SearchResults";
import SearchSection from "../SearchSection";

function Map() {
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Load the Google Maps JavaScript API
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDH879TAZA0FWChK3UJDcx3A5jxQI1XqxI&libraries=places`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize the map
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 1.3521, lng: 103.8198 },
        zoom: 12,
      });

      // Create the marker
      markerRef.current = new window.google.maps.Marker({
        map: mapInstance.current,
      });

      // Create the autocomplete instance
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);

      // Set the bounds to restrict the autocomplete results
      autocomplete.bindTo("bounds", mapInstance.current);

      // Listen for the 'place_changed' event to get the selected place
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry) {
          console.error("No geometry found for the selected place.");
          return;
        }

        // Update the map's center to the selected place's coordinates
        mapInstance.current.setCenter(place.geometry.location);
        mapInstance.current.setZoom(16);

        // Set the marker position to the selected place's coordinates
        markerRef.current.setPosition(place.geometry.location);
        markerRef.current.setVisible(true);

        // Perform search based on the selected place
        performSearch(place.name);
      });
    };
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const performSearch = async (placeName) => {
    try {
      const response = await axios.get(`/api/search?place=${placeName}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error in fetching carpark data!", error);
    }
  };

  return (
    <>
      <Flex direction="row">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
          size="lg"
          mr={2}
        />
      </Flex>
      <div ref={mapRef} style={{ width: "100%", height: "1000px" }}></div>
    </>
  );
}

export default Map;
