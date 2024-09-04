import * as React from "react";
import Leaflet from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapRef } from "./MapRef";



Leaflet.Icon.Default.imagePath =
  "//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/";

  export function ContainMap({ children, position }) {
    const mapContainerStyle = { height: '95vh', width: '50vw', borderRadius: '1.25%' };
    const mapContainerRef = React.useRef();
    return (
      <MapContainer ref={mapContainerRef} center={position} zoom={12} style={mapContainerStyle} maxZoom={20}>
        {children}
      </MapContainer>
    );
  }

  function MapComponent({ position, onMarkerClick, setSelected, markers, setMarkers }) {
    
    return (
      <>
        <ContainMap position={position}>
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          />
          <MapRef width={800} height={600} onMarkerClicks={onMarkerClick} setSelected={setSelected} markers={markers} setMarkers={setMarkers}/>
        </ContainMap>
      </>
    );
  }

export default MapComponent;

// <MapRef width={800} height={600} onMarkerClick={onMarkerClick} selected={selected} />
//        <MapRef width={800} height={600} onMarkerClick={onMarkerClick} selected={selected} markers={markers} setMarkers={setMarkers}/>
