import React from "react";

const SearchResults = ({ carparkLocations }) => {
  return (
    <div>
      {carparkLocations.map((location) => (
        <div key={location.CarParkID}>
          <h2>{location.Development}</h2>
          <p>Available Lots: {location.AvailableLots}</p>
          <p>Lot Type: {location.LotType}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;