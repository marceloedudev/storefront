import { LayoutContainer } from './styles';
import Navbar from '@view/components/Navbar';
import React from 'react';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <LayoutContainer>
      <div className="layout-wrapper">
        <Navbar />
        <div className="layout-content">{children}</div>
      </div>
    </LayoutContainer>
  );
};

export default DefaultLayout;
