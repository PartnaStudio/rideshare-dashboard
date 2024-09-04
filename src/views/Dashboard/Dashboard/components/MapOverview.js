// Chakra imports
import { Box } from "@chakra-ui/react";
// Custom components
import React, { useState } from "react";
import { MARKERS } from "views/Dashboard/Map/MarkMap/functions";
import MapComponent from "views/Dashboard/Map/MarkMap/MapComponent";

const MapDataOverview = ({ position, title, activeButton, handleMarkerClick, selected, locations, setLocations }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  
  


  
  return (
    <div p='10px' mb={{ sm: "26px", lg: "0px" }}>
      <Box w={{ sm: "100%", md: '100%', lg: "50%" }} ps='8px'>
        <MapComponent position={position} onMarkerClick={handleMarkerClick} setSelected={selected} markers={locations} setMarkers={setLocations}/>         
      </Box>
    </div>
  );
};

export default MapDataOverview;
