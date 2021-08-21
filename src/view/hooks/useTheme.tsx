import React from 'react';
import { ThemeProvider } from 'styled-components';
import { themeBase } from '@view/styles/themes';

const ThemeProviderStyle = ({ children }) => (
  <ThemeProvider theme={themeBase}>{children}</ThemeProvider>
);

export { ThemeProviderStyle };
