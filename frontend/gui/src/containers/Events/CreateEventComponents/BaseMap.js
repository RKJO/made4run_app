import React, { Fragment, useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @react-leaflet components
import {
  Map,
  LayersControl,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

import { mapStyles } from "../../../assets/jss/containers/mapStyles";

const { BaseLayer } = LayersControl;

const useStyles = makeStyles(mapStyles);

const BaseMap = () => {
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

  const addPolylineMarker = (e, idx) => {
    e.originalEvent.view.L.DomEvent.stopPropagation(e);
    setMarkers((prevState) => {
      const prevMarkers = [...markers];
      const newMarkers = [
        ...prevMarkers.slice(0, idx + 1),
        e.latlng,
        ...prevMarkers.slice(idx + 1),
      ];

      return newMarkers;
    });
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
      zoomControl={false}
      zoom={13}
      onClick={addMarker}
    >
      <LayersControl position='topleft'>
        <BaseLayer checked name='Color'>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
        </BaseLayer>
        <BaseLayer name='Black&White'>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
          />
        </BaseLayer>

        {markers.map((position, idx) => (
          <Fragment key={idx}>
            <Marker
              position={position}
              draggable='true'
              onDrag={(e) => moveMarker(e, idx)}
            >
              <Popup>
                <IconButton
                  aria-label='Usuń'
                  onClick={() => console.log("marker", idx)}
                >
                  <DeleteIcon className={classes.dangerColor} />
                </IconButton>
              </Popup>
            </Marker>
            {(markers.length >= 2) & (markers.length !== idx + 1) ? (
              <Polyline
                className={classes.polylineStyle}
                positions={[markers[idx], markers[idx + 1]]}
                onClick={(e) => addPolylineMarker(e, idx)}
              />
            ) : null}
          </Fragment>
        ))}
      </LayersControl>
    </Map>
  );
};

export { BaseMap };
