// Chakra imports
import { Box } from "@chakra-ui/react";
// Custom components
import React, { useState } from "react";
import { MARKERS } from "views/Dashboard/Map/MarkMap/functions";
import MapComponent from "views/Dashboard/Map/MarkMap/MapComponent";

const MapDataOverview = ({ title, percentage, activeButton, handleMarkerClick, selected }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [markers, setMarkers] = React.useState(MARKERS);
  


  
  return (
    <div p='10px' mb={{ sm: "26px", lg: "0px" }}>
      <Box w={{ sm: "100%", md: '100%', lg: "50%" }} ps='8px'>
        <MapComponent onMarkerClick={handleMarkerClick} selected={selected} markers={markers} setMarkers={setMarkers}/>         
      </Box>
    </div>
  );
};

export default MapDataOverview;
