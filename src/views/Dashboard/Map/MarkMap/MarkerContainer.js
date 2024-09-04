import * as React from "react";
import { Marker, Tooltip } from "react-leaflet";
import { icon } from "leaflet";
import "./styles.css";
import { Box } from "@chakra-ui/react";

const markerIcon = (selected) =>
  icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${
      selected ? "red" : "green"
    }.png`,
    shadowUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png"
  });

export function MarkerContainer({ position, id, onMarkerClick, selected, city, population }) {
  const eventHandlers = React.useMemo(
    () => ({
      click(e) {
        try {
          console.log('Marker clicked, id:', id);
          onMarkerClick(id, position);
        } catch (error) {
          console.error('Error in marker click handler:', error);
        }
      }
    }),
    [onMarkerClick, id, position]
  );



  return (
    <>
      <Marker
        position={position}
        eventHandlers={eventHandlers}
        icon={markerIcon(selected)}
      >
          <Tooltip
      direction="right"
      offset={[0, -10]}
      opacity={1}
      permanent
      className="apple-tooltip"
    >
      
        <Box style={{display: 'flex', flexDirection: 'column'}} className="top-row">
        <Box fontSize={6} pt={2}>{'City Name'}</Box>
        <Box px={2}>{city}</Box>
        </Box>
      {/*<Box p={4}>
        <Box fontSize={8}>{'City Population'}</Box>
        <Box>{population}</Box>
  </Box>*/}
    </Tooltip>
      </Marker>
    </>
  );
}

//