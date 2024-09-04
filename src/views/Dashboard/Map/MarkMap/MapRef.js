import * as React from "react";
import { latLng, latLngBounds } from "leaflet";
//import { useMap } from "react-leaflet";
import isEqual from "lodash.isequal";

import MarkerClusterContainer from "./MarkerClusterContainer.js";
import { useMap } from "react-leaflet";
import { getFilteredMarkers } from "./functions.js";





export function MapRef({
  width,
  height,
  onMarkerClicks,
  setSelected,
  markers,
  setMarkers,
}) {
  const mapReference = useMap();
  const DEF_BOUNDS = latLng([26.0380, -80.2101]).toBounds(5000);
  const bounds = React.useRef(DEF_BOUNDS);

  const whenMarkerClicked = React.useCallback(
    (id, pos) => {
      const updatedMarkers = markers.map((marker) => ({
        ...marker,
        selected: marker.id === id ? !marker.selected : marker.selected,
      }));
  
      setSelected(getFilteredMarkers(updatedMarkers))
      if (mapReference) {
        let newBounds = DEF_BOUNDS;
        newBounds = latLng(pos).toBounds(1500);
        // Adjust this value if needed
        if (!isEqual(isEqual(newBounds, bounds.current))) { // Double check isEqual usage
          bounds.current = newBounds;
          mapReference.fitBounds(newBounds);
        }
      }
    },
    [mapReference] // Only re-create if mapRef changes
  );

  
  return (
    <>
      <MarkerClusterContainer
        mapRef={mapReference}
        width={width}
        height={height}
        markers={markers}
        onMarkerClick={whenMarkerClicked}
      />
    </>
  );
}

