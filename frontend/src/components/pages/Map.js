import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Input, Flex, Box, Button } from "@chakra-ui/react";
import { auth } from "./firebase";

function Map() {
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const infoWindowRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favoriteLocation, setFavoriteLocation] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const handleAddToFavorites = () => {
    if (searchedLocation) {
      setFavoriteLocation(searchedLocation);
      setFavorites([...favorites, searchedLocation]);
    }
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFavoriteItemClick = (location) => {
    setFavoriteLocation(location);
    setIsDropdownOpen(false);
  };

const renderFavoriteLocationsDropdown = () => {
  if (!isDropdownOpen) return null;

  return (
    <Box mt={2} border="1px solid #ccc" borderRadius="4px" position="absolute" zIndex={1}>
      {favorites.length > 0 ? (
        favorites.map((location, index) => (
          <Box
            key={index}
            p={2}
            cursor="pointer"
            _hover={{ background: "#f0f0f0" }}
            onClick={() => handleFavoriteItemClick(location)}
          >
            Latitude: {location.lat}, Longitude: {location.lng}
          </Box>
        ))
      ) : (
        <Box p={2}>
          No favorite locations added.
        </Box>
      )}
      {/* Show the "Sign in" message if the user is not logged in */}
      {!isLoggedIn && (
        <Box p={2}>
          Sign in to add a favorite location. <a href="/login">Sign In</a>
        </Box>
      )}
    </Box>
  );
};



  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
  }, []);
  
  


  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDH879TAZA0FWChK3UJDcx3A5jxQI1XqxI&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 1.3521, lng: 103.8198 },
        zoom: 12,
      });

      const autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current
      );
      autocomplete.bindTo("bounds", mapInstance.current);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry) {
          console.error("No geometry found for the selected place.");
          return;
        }

        mapInstance.current.setCenter(place.geometry.location);
        mapInstance.current.setZoom(17);

        setSearchedLocation(place.geometry.location);

        performSearch(place.name);
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current = [];

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

      marker.addListener("click", () => {
        if (infoWindowRef.current) {
          infoWindowRef.current.close();
        }

        const infowindow = new window.google.maps.InfoWindow({
          content: `<div>${result.development}</div>
          <div>Available Lots: ${result.availableLots}</div>
          <div>Parking Rates: ${result.parkingRatePerHour}</div>
          <div><a href="https://www.google.com/maps/search/?api=1&query=${result.location}">Open in Google Maps</a></div>`,
        });
        infowindow.open(mapInstance.current, marker);

        infoWindowRef.current = infowindow;
      });

      markersRef.current.push(marker);
    });

    if (searchedLocation) {
      const searchMarker = new window.google.maps.Marker({
        position: searchedLocation,
        map: mapInstance.current,
        title: "Searched Location",
        icon: {
          url: "https://cdn-icons-png.flaticon.com/512/4451/4451008.png",
          scaledSize: new window.google.maps.Size(45, 45),
        },
      });

      searchMarker.addListener("click", () => {
        if (infoWindowRef.current) {
          infoWindowRef.current.close();
        }

        const infowindow = new window.google.maps.InfoWindow({
          content: "Searched Location",
        });
        infowindow.open(mapInstance.current, searchMarker);

        infoWindowRef.current = infowindow;
      });

      markersRef.current.push(searchMarker);
    }
  }, [searchResults, searchedLocation]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const performSearch = async (placeName) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/search"
      );
      const processedData = response.data.map((carpark) => ({
        location: carpark.Location,
        development: carpark.Development,
        availableLots: carpark.AvailableLots,
        parkingRatePerHour: carpark["parking-rate-per-hour"],
      }));
      console.log("Processed data:", processedData);

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

  const currentLocationMarker = useRef(null);

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = { lat: latitude, lng: longitude };
          setCurrentLocation(currentLocation);
          mapInstance.current.setCenter(currentLocation);
          mapInstance.current.setZoom(17);

          if (currentLocationMarker.current) {
            // Update the position of the existing current location marker
            currentLocationMarker.current.setPosition(currentLocation);
          } else {
            // Create a new current location marker
            currentLocationMarker.current = new window.google.maps.Marker({
              position: currentLocation,
              map: mapInstance.current,
              title: "Current Location",
              icon: {
                url: "https://cdn-icons-png.flaticon.com/512/4451/4451008.png",
                scaledSize: new window.google.maps.Size(45, 45),
              },
            });
          }

          markersRef.current.push(currentLocationMarker.current);

          performSearch("");
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Flex direction="column" align="center" mt={4}>
      {/* Existing code */}
      <Box mb={2}>
        <Input
          ref={inputRef}
          type="text"
          placeholder="Where are we going?"
          value={searchTerm}
          onChange={handleChange}
          size="lg"
          className="search-button"
        />
      </Box>
      {/* Existing code */}
      <Button onClick={handleGetCurrentLocation} colorScheme="teal" mb={4}>
        Use My Current Location
      </Button>
      {/* New: Add a "Favorites" button with a dropdown */}
      <Box position="relative">
        <Button onClick={handleDropdownToggle} colorScheme="teal" mb={4}>
          <i className="fa-solid fa-star"></i> Saved
        </Button>
        {/* Show favorite locations as a dropdown */}
        {renderFavoriteLocationsDropdown()}
      </Box>
      {/* Conditionally render the favorite location or "Sign in" message */}
      <div ref={mapRef} style={{ width: "100%", height: "1000px" }}></div>
    </Flex>
  );
  }  

export default Map;
