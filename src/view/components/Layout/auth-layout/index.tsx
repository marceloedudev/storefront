import { LayoutContainer } from './styles';
import React from 'react';

const AuthLayout: React.FC = ({ children }) => {
  return (
    <LayoutContainer>
      <div className="layout-content">{children}</div>
      <div className="layout-background" />
    </LayoutContainer>
  );
};

export default AuthLayout;
