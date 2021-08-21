import { randomDots, renderDots } from './validators';

import HomeMap from '@view/pages/home-map';
import React from 'react';

const MakeHomeMap: React.FC = () => {
  return <HomeMap renderDots={renderDots} randomDots={randomDots()} />;
};

export default MakeHomeMap;
