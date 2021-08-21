import React, { useState } from 'react';

import MapContainer from './components/MapContainer';
import useRenderDots from './hooks/useRenderDots';

type IHomeMap = {
  renderDots: any;
  randomDots: any;
};

const HomeMap: React.FC<IHomeMap> = ({ renderDots, randomDots }) => {
  const [mapRef, setMapRef] = useState<React.MutableRefObject<any>>();

  useRenderDots({ mapRef, renderDots, randomDots });

  return <MapContainer setMapRef={setMapRef} />;
};

export default HomeMap;
