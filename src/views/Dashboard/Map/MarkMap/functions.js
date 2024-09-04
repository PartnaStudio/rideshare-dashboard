import * as React from "react";
import { latLng, latLngBounds } from "leaflet";
import isEqual from "lodash.isequal";
import MarkerClusterContainer from "./MarkerClusterContainer.js";
import { useMap } from "react-leaflet";





export const generateMarkers = (count) => {
  const southWest = new latLng(30.0, -20.0);
  const northEast = new latLng(60.0, 20.0);
  const bounds = new latLngBounds(southWest, northEast);

  const minLat = bounds.getSouthWest().lat,
    rangeLng = bounds.getNorthEast().lat - minLat,
    minLng = bounds.getSouthWest().lng,
    rangeLat = bounds.getNorthEast().lng - minLng;

  const result = Array.from({ length: count }, (v, k) => {
    return {
      id: k,
      selected: false,
      pos: new latLng(
        minLat + Math.random() * rangeLng,
        minLng + Math.random() * rangeLat
      )
    };
  });
  return result;
};
export const MARKERS = generateMarkers(10);
export const getFilteredMarkers = (markers) => {
  return markers.filter(marker => marker.selected);
};


