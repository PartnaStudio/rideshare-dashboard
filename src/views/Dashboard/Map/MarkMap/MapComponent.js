import * as React from "react";
import Leaflet from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapRef } from "./MapRef";
import MarkerClusterGroup from "react-leaflet-markercluster";


Leaflet.Icon.Default.imagePath =
  "//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/";

function MapComponent({ dimensions, onMarkerClick, selected, markers, setMarkers }) {
    const position = [51.505, -0.09];
    const mapStyle = { height: '95vh', width: '50vw', borderRadius: '1.25%' };
    const mapRef = React.useRef();

  return (
    <>
      <MapContainer ref={mapRef} center={position} zoom={2} style={mapStyle} maxZoom={20}>
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
     <MapRef width={800} height={600} onMarkerClick={onMarkerClick} selected={selected} markers={markers} setMarkers={setMarkers}/>

      </MapContainer>
      </>
  );
}

export default MapComponent;

// <MapRef width={800} height={600} onMarkerClick={onMarkerClick} selected={selected} />
//        <MapRef width={800} height={600} onMarkerClick={onMarkerClick} selected={selected} markers={markers} setMarkers={setMarkers}/>
