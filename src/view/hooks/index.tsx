import {
  getUserAccessTokenAdapter,
  setUserAccessTokenAdapter,
} from '@main/adapters/user-access-token';
import {
  getUserRefreshTokenAdapter,
  setUserRefreshTokenAdapter,
} from '@main/adapters/user-refresh-token';

import GlobalStyle from '@view/styles/global';
import React from 'react';
import { RecoilRoot } from 'recoil';
import Routes from '@main/routes';
import { ThemeProviderStyle } from './useTheme';
import { ToastBaseProvider } from '@view/components/Toast';
import VerifyUser from './useVerifyUser';
import { currentTokenState } from '@view/atoms';

const AppProvider: React.FC = ({ children }) => {
  const state = {
    setAccessToken: setUserAccessTokenAdapter,
    getAccessToken: getUserAccessTokenAdapter,
    setRefreshToken: setUserRefreshTokenAdapter,
    getRefreshToken: getUserRefreshTokenAdapter,
  };

  return (
    <RecoilRoot
      initializeState={({ set }) => {
        set(currentTokenState, state);
      }}
    >
      <ThemeProviderStyle>
        <VerifyUser />
        <GlobalStyle />
        <ToastBaseProvider />
        <Routes />
        {children}
      </ThemeProviderStyle>
    </RecoilRoot>
  );
};

export default AppProvider;
