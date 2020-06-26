import React, { useEffect, useRef, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// nodejs library that concatenates classes
import classNames from "classnames";
// @react-leaflet components
import { Map, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-gpx";

import { mapStyles } from "../../assets/jss/containers/mapStyles";

const useStyles = makeStyles(mapStyles);

const MapDisplayGPX = ({
  mapLG,
  mapSM,
  gpx,
  doubleClickZoom,
  zoomControl,
  scrollWheelZoom,
}) => {
  const classes = useStyles();
  const map = useRef();

  const leafletContainer = classNames({
    [classes.leafletContainer]: mapLG,
    [classes.leafletSmall]: mapSM,
  });
  console.log(typeof gpx);

  const [mapPosition, setMapPosition] = useState([52.22977, 21.01178]);

  useEffect(() => {
    new L.GPX(gpx, { async: true })
      .on("loaded", function (e) {
        map.current.leafletElement.fitBounds(e.target.getBounds(), {
          padding: [20, 20],
        });
      })
      .addTo(map.current.leafletElement);
  }, [map]);

  return (
    <Map
      ref={map}
      center={mapPosition}
      zoom={13}
      className={leafletContainer}
      doubleClickZoom={doubleClickZoom}
      zoomControl={zoomControl}
      scrollWheelZoom={scrollWheelZoom}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
      />
    </Map>
  );
};

export { MapDisplayGPX };
