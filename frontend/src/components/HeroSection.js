import React from "react";
import "./HeroSectionStyle.js";
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from "@material-ui/core"; 
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyles from './HeroSectionStyle.js';

const Map = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width:600px)');

  const coordinates = { lat: 45.4211, lng: -75.6903 };
  
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBdPHcZEA-S3omf4sW6pv22OyJQaxFV1VA' }}
        defaultCenter = {coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50,50,50,50]}
        options={''}
        onChange={''}
        onChildClick={''}
        >

        </GoogleMapReact>

        <h1> send help </h1>
    </div>
  )

}

export default Map;