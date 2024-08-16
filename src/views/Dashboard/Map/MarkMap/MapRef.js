import * as React from "react";
import { latLng, latLngBounds } from "leaflet";
//import { useMap } from "react-leaflet";
import isEqual from "lodash.isequal";

import MarkerClusterContainer from "./MarkerClusterContainer.js";
import { useMap } from "react-leaflet";



const DEF_BOUNDS = latLng([51.505, -0.09]).toBounds(5000);

export function MapRef({
  width,
  height,
  onMarkerClick: setSelected,
  selected,
  markers,
  setMarkers,
}) {
  const mapRef = useMap();
  console.log("MapRef - mapRef:", mapRef);
  const bounds = React.useRef(DEF_BOUNDS);

  const onMarkerClick = React.useCallback(
    (id, pos) => {
      onMarkerClick(id);
      setMarkers((prevMarkers) =>
        prevMarkers.map((marker) => ({
          ...marker,
          selected: marker.id === id || marker.selected
        }))
      );
      if (mapRef) {
        let newBounds = DEF_BOUNDS;
        newBounds = latLng(pos).toBounds(1500);
        if (!isEqual(newBounds, bounds?.current)) {
          bounds.current = newBounds;
          mapRef.fitBounds(newBounds);
        }
      }
    },
    [mapRef, onMarkerClick]
  );
  

  return (
    <>
      <MarkerClusterContainer
        mapRef={mapRef}
        width={width}
        height={height}
        markers={markers}
        onMarkerClick={onMarkerClick}
      />
    </>
  );
}

