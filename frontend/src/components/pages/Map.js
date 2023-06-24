import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Input, Flex, Box } from "@chakra-ui/react";

function Map() {
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]); // Reference to store all marker instances
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const infoWindowRef = useRef(null); // Reference to the currently open infowindow

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

      // Create the autocomplete instance
      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current
      );

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

        // Set the searched location
        setSearchedLocation(place.geometry.location);

        // Perform search based on the selected place
        performSearch(place.name);
      });
    };
  }, []);

  useEffect(() => {
    // Clear existing markers
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current = [];

    // Create new markers based on searchResults
    searchResults.forEach((result) => {
      const marker = new window.google.maps.Marker({
        position: {
          lat: parseFloat(result.location.split(" ")[0]),
          lng: parseFloat(result.location.split(" ")[1]),
        },
        map: mapInstance.current,
        title: result.development,
        label: result.availableLots.toString(),
      });

      // Add event listener for marker click
      marker.addListener("click", () => {
        // Close the previous infowindow if it exists
        if (infoWindowRef.current) {
          infoWindowRef.current.close();
        }

        const infowindow = new window.google.maps.InfoWindow({
          content: `<div>${result.development}</div><div>Available Lots: ${result.availableLots}</div><div><a href="https://www.google.com/maps/search/?api=1&query=${result.location}">Open in Google Maps</a></div>`,
        });
        infowindow.open(mapInstance.current, marker);

        // Update the infoWindowRef with the new infowindow
        infoWindowRef.current = infowindow;
      });

      // Add the marker to the markersRef
      markersRef.current.push(marker);
    });

    // Create a marker for the searched location
    if (searchedLocation) {
      const searchMarker = new window.google.maps.Marker({
        position: searchedLocation,
        map: mapInstance.current,
        title: "Searched Location",
        icon: {
          url: "https://cdn-icons-png.flaticon.com/512/4451/4451008.png", // Custom marker icon URL
          scaledSize: new window.google.maps.Size(45, 45), // Specify the desired size of the marker icon
        },
      });

      // Add event listener for marker click
      searchMarker.addListener("click", () => {
        // Close the previous infowindow if it exists
        if (infoWindowRef.current) {
          infoWindowRef.current.close();
        }

        const infowindow = new window.google.maps.InfoWindow({
          content: "Searched Location",
        });
        infowindow.open(mapInstance.current, searchMarker);

        // Update the infoWindowRef with the new infowindow
        infoWindowRef.current = infowindow;
      });

      // Add the search marker to the markersRef
      markersRef.current.push(searchMarker);
    }
  }, [searchResults, searchedLocation]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const performSearch = async (placeName) => {
    try {
      const response = await axios.get("http://localhost:3000/api/search");
      const processedData = response.data.value.map((carpark) => ({
        location: carpark.Location,
        development: carpark.Development,
        availableLots: carpark.AvailableLots,
      }));

      // Filter the carparks based on the map bounds
      const filteredData = processedData.filter((carpark) => {
        const [lat, lng] = carpark.location.split(" ").map(parseFloat);
        const carparkPosition = new window.google.maps.LatLng(lat, lng);
        return mapInstance.current.getBounds().contains(carparkPosition);
      });

      setSearchResults(filteredData);
    } catch (error) {
      console.error("Error in fetching carpark data!", error);
    }
  };

  return (
    <Flex direction="column" align="center" mt={50}> {/* Center the search bar vertically and add top margin */}
      <Box mb={50}> {/* Add bottom margin to create space between the map and the search bar */}
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
          size="lg"
        />
      </Box>
      <div ref={mapRef} style={{ width: "100%", height: "1000px" }}></div>
    </Flex>
  );
}


export default Map;
