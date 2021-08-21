import { MapContainer, TileLayer } from 'react-leaflet';
import React, { useEffect, useState } from 'react';

import { LatLngTuple } from 'leaflet';
import { MapBaseContainer } from './styles';

type IMapBase = {
  position: LatLngTuple;
  height?: number;
  zoom?: number;
  setMapRef?: any;
};

const MapBase: React.FC<IMapBase> = (props) => {
  const { height, position, zoom, setMapRef } = props;

  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    map?.current?.leafletElement?.invalidateSize();

    if (setMapRef) {
      setMapRef(map);
    }
  }, [map, setMapRef]);

  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <MapBaseContainer height={height}>
      <MapContainer
        whenCreated={setMap}
        center={position}
        zoom={zoom || 12}
        maxZoom={16}
        minZoom={3}
        zoomControl={false}
      >
        <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </MapBaseContainer>
  );
};

export default MapBase;
