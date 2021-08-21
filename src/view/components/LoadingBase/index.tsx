import { LoadingContainer } from './styles';
import React from 'react';

const LoadingBase: React.FC = () => {
  return (
    <LoadingContainer>
      <div className="loader"></div>
    </LoadingContainer>
  );
};

export default LoadingBase;
