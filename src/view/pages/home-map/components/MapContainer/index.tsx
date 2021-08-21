import MapBase from '@view/components/MapBase';
import React from 'react';

type IMapContainer = {
  setMapRef: any;
};

const MapContainer: React.FC<IMapContainer> = ({ setMapRef }) => {
  return (
    <div style={{ position: 'relative' }}>
      <MapBase setMapRef={setMapRef} position={[-9.6, -35.7]}></MapBase>
    </div>
  );
};

export default MapContainer;
