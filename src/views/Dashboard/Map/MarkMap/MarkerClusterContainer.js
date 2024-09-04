import * as React from "react";
import { MarkerContainer } from "./MarkerContainer";
import MarkerClusterer from "./MarkerClusterMaker";

function MarkerClusterContainer({
  mapRef,
  width,
  height,
  markers,
  onMarkerClick
}) {
  React.useEffect(() => {
    console.log('useEffect triggered in MarkerClusterContainer');
    if (mapRef) {
      console.log('mapRef is available in useEffect:', mapRef);
      mapRef.invalidateSize();
    } else {
      console.log('mapRef is NOT available in useEffect'); 
    }
  }, [mapRef, width, height]);

  console.log('mapRef in MarkerClusterContainer:', mapRef); // Log the mapRef

  const MemoizedMarkerContainer = React.memo(MarkerContainer, (prevProps, nextProps) => {
    return prevProps?.position === nextProps?.position && 
           prevProps?.selected === nextProps?.selected;
  });
  

  const markerComponents = React.useMemo(() => {
    console.log("About to Render: ",markers);
    return markers.map((marker) => {
      return (
        <MemoizedMarkerContainer
          position={marker?.pos}
          key={marker?.id}
          id={marker?.id}
          city={marker?.city}
          population={marker?.population}
          onMarkerClick={onMarkerClick}
          selected={marker?.selected}
        />
      );
    });
  }, [markers, onMarkerClick]);

  console.log('markerComponents:', markerComponents); 
  console.log("MarkerClusterContainer - passedMapRef:", mapRef); 


  return (
    <>
    <MarkerClusterer>
      {markerComponents}
      </MarkerClusterer>
    </>
  );
}

export default MarkerClusterContainer;

// export default React.memo(MarkerClusterContainer, (props, nextProps) => {
//   if (props.width !== nextProps.width || props.height !== nextProps.height) {
//     props.mapRef.invalidateSize();
//     return true;
//   }
// });
