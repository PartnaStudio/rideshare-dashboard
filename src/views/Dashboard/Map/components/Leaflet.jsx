import React, { useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerCluster from "./Clusters";
import 'leaflet/dist/leaflet.css';

const position = [51.505, -0.09];
const mapStyle = { height: '25vh', width: '75vw' };

const Leaflet = () => {
const mapRef = useRef();
  let markers;

  const addMarkers = () => {
    markers = [];
    for (let i = 0; i < 10000; i++) {
      markers.push({
        position: {
          lng: -122.673447 + Math.random() * 200.0,
          lat: 45.5225581 - 60 + Math.random() * 80
        }
      });
    }
  };

  addMarkers();

  return (
    <>
      <MapContainer ref={mapRef} center={position} zoom={2} style={mapStyle} maxZoom={20}>
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        <MarkerCluster markers={markers} addMarkers={addMarkers} />
      </MapContainer>
    </>
  );
};

export default Leaflet;
