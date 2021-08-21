import 'leaflet/dist/leaflet.css';

import { ITheme } from './themes/models';
import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalDefaults = createGlobalStyle<ITheme>`
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;

  :focus {
    outline: 0;
  }
}

html, body, #root {
  height: 100%;
}

body {
  background: ${({ theme }) => theme.backgrounds.primary};
  color: #333;
  max-width: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body, input, button {
  font-family: 'Roboto', serif;
  font-size: 14px;
}

a {
  text-decoration: none;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

button {
  cursor: pointer;

  :disabled {
    cursor: not-allowed;
  }
}

input::-ms-reveal, input::-ms-clear {
  display: none;
}

section {
  background:white;
  max-width: 800px;
  margin:0 auto;
  padding: 4em;

  h1 {
    margin: 0 0 2em;
  }

  h3 {
    margin: 1.5em 0 0;
  }
}
`;

const GlobalStyle: React.FC = () => {
  return (
    <React.Fragment>
      <GlobalDefaults />
    </React.Fragment>
  );
};

export default GlobalStyle;
