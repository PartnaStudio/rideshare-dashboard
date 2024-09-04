import * as React from "react";

import { createPathComponent } from '@react-leaflet/core';
import L from 'leaflet';
import { Marker } from "react-leaflet";

require('leaflet.markercluster');
import'./MarkerCluster.Default.css';
import './MarkerCluster.css';

const MarkerClusterer = createPathComponent(
  ({ children: _c, ...props }, ctx) => {
    const clusterProps = {};
    const clusterEvents = {};

    // Splitting props and events to different objects
    Object.entries(props).forEach(([propName, prop]) =>
      propName.startsWith('on')
        ? (clusterEvents[propName] = prop)
        : (clusterProps[propName] = prop)
    );

    // Creating markerClusterGroup Leaflet element
    const markerClusterGroup = new L.markerClusterGroup({
      spiderfyOnMaxZoom: true, // Always show clusters
      iconCreateFunction: (cluster) => {
        const childCount = cluster.getChildCount();
        const c = 'marker-cluster-';
        const icon = L.divIcon({
          html: `<div><span style="color: 'blue'">${childCount}</span></div>`,
          className: `${c} marker-cluster-small`,
          iconSize: L.point(30, 30),
        });
        return icon;
      },
    });

    React.Children.forEach(_c, (child) => {
      if (child && child.type === Marker) {
        markerClusterGroup.addLayer(child.props.instance);
      }
    });

    // Initializing event listeners
    Object.entries(clusterEvents).forEach(([eventAsProp, callback]) => {
      const clusterEvent = `cluster${eventAsProp.substring(2).toLowerCase()}`;
      markerClusterGroup.on(clusterEvent, callback);
    });

    return {
      instance: markerClusterGroup,
      context: { ...ctx, layerContainer: markerClusterGroup },
    };
  }
);

export default MarkerClusterer;