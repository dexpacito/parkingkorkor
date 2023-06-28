import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Input, Flex, Box, Button } from "@chakra-ui/react";

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

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDH879TAZA0FWChK3UJDcx3A5jxQI1XqxI&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 1.3521, lng: 103.8198 },
        zoom: 12,
        styles: [
          {
            featureType: "all",
            elementType: "all",
            stylers: [
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "administrative",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#444444",
              },
            ],
          },
          {
            featureType: "administrative.province",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "administrative.locality",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "administrative.neighborhood",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "administrative.land_parcel",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "landscape",
            elementType: "all",
            stylers: [
              {
                color: "#f2f2f2",
              },
            ],
          },
          {
            featureType: "landscape.man_made",
            elementType: "all",
            stylers: [
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
              {
                color: "#cee9de",
              },
              {
                saturation: "2",
              },
              {
                weight: "0.80",
              },
            ],
          },
          {
            featureType: "poi.attraction",
            elementType: "geometry.fill",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "poi.park",
            elementType: "all",
            stylers: [
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "all",
            stylers: [
              {
                saturation: -100,
              },
              {
                lightness: 45,
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "all",
            stylers: [
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [
              {
                visibility: "on",
              },
              {
                color: "#f5d6d6",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "labels.icon",
            stylers: [
              {
                hue: "#ff0000",
              },
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "road.highway.controlled_access",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "road.highway.controlled_access",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "on",
              },
              {
                hue: "#0064ff",
              },
              {
                gamma: "1.44",
              },
              {
                lightness: "-3",
              },
              {
                weight: "1.69",
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "all",
            stylers: [
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road.local",
            elementType: "all",
            stylers: [
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "road.local",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "simplified",
              },
              {
                weight: "0.31",
              },
              {
                gamma: "1.43",
              },
              {
                lightness: "-5",
              },
              {
                saturation: "-22",
              },
            ],
          },
          {
            featureType: "transit",
            elementType: "all",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "transit.line",
            elementType: "all",
            stylers: [
              {
                visibility: "on",
              },
              {
                hue: "#ff0000",
              },
            ],
          },
          {
            featureType: "transit.station.airport",
            elementType: "all",
            stylers: [
              {
                visibility: "simplified",
              },
              {
                hue: "#ff0045",
              },
            ],
          },
          {
            featureType: "transit.station.bus",
            elementType: "all",
            stylers: [
              {
                visibility: "on",
              },
              {
                hue: "#00d1ff",
              },
            ],
          },
          {
            featureType: "transit.station.bus",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "transit.station.rail",
            elementType: "all",
            stylers: [
              {
                visibility: "simplified",
              },
              {
                hue: "#00cbff",
              },
            ],
          },
          {
            featureType: "transit.station.rail",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [
              {
                color: "#46bcec",
              },
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [
              {
                weight: "1.61",
              },
              {
                color: "#cde2e5",
              },
              {
                visibility: "on",
              },
            ],
          },
        ],
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
          content: `<div>${result.development}</div><div>Available Lots: ${result.availableLots}</div><div><a href="https://www.google.com/maps/search/?api=1&query=${result.location}">Open in Google Maps</a></div>`,
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
        "https://parkingkorkor-390513.et.r.appspot.com/api/search"
      );
      const processedData = response.data.map((carpark) => ({
        location: carpark.Location,
        development: carpark.Development,
        availableLots: carpark.AvailableLots,
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
      <Button onClick={handleGetCurrentLocation} colorScheme="teal" mb={4}>
        Use My Current Location
      </Button>
      <div ref={mapRef} style={{ width: "100%", height: "1000px" }}></div>
    </Flex>
  );
}

export default Map;
