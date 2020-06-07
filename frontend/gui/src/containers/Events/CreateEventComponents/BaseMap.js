import React, { Fragment, useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @react-leaflet components
import { Map, TileLayer, Marker, Popup, Polyline } from "react-leaflet";

import {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  primaryBoxShadow,
  infoBoxShadow,
} from "../../../assets/jss/main";

// import "../../../assets/scss/map/map.scss";
// import { polyline } from "leaflet";

const mapStyles = {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  primaryBoxShadow,
  infoBoxShadow,

  leafletContainer: {
    width: "100%",
    height: "90vh",
  },
  polylineStyle: {
    stroke: dangerColor,
    /* fill: none; */
    strokeDasharray: "20,20",
    strokeWidth: "7",
    opacity: "0.7",
  },
};

const useStyles = makeStyles(mapStyles);

const BaseMap = () => {
  // @material-ui/core components

  const classes = useStyles();

  const [mapPosition, setMapPosition] = useState([52.22977, 21.01178]);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMapPosition([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);
      }
    );
  }, []);

  const addMarker = (e) => {
    setMarkers((prevState) => [...prevState, e.latlng]);
  };

  const moveMarker = (e, idx) => {
    setMarkers((prevState) => {
      const prevMarkers = [...prevState];
      prevMarkers[idx] = e.latlng;
      return prevMarkers;
    });
  };

  return (
    <Map
      className={classes.leafletContainer}
      doubleClickZoom='true'
      center={mapPosition}
      zoom='12'
      onClick={addMarker}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
      {markers.map((position, idx) => (
        <Fragment key={idx}>
          <Marker
            key={`marker-${idx}`}
            position={position}
            draggable='true'
            onDrag={(e) => moveMarker(e, idx)}
          >
            <Popup>
              Usuń <i class='fas fa-minus-circle'></i>
            </Popup>
          </Marker>
          {(markers.length >= 2) & (markers.length !== idx + 1) ? (
            <Polyline
              className={classes.polylineStyle}
              key={`polyline-${idx}`}
              positions={[markers[idx], markers[idx + 1]]}
              onClick={(e) => console.log(e, idx)}
            />
          ) : null}
        </Fragment>
      ))}
    </Map>
  );
};

export { BaseMap };
