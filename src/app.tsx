import { CssBaseline, ThemeProvider } from '@mui/material';
import { DAppProvider } from '@usedapp/core';
import { ChainChecker } from 'components/chain-checker';
import { Config } from 'config';
import { useBackendClient } from 'hooks/use-backend-client';
import { useMuiTheme } from 'hooks/use-mui-theme';
import { ClaimPage } from 'page/claim-page';
import { MainPage } from 'page/main-page';
import { OrbsPage } from 'page/orbs-page';
import { HttpClientProvider } from 'provider/http-client-provider';
import { LoggerProvider, PinoWrapper } from 'provider/logger-provider';
import { StyledComponentsThemeProvider } from 'provider/styled-components-theme-provider';
import React, { useMemo } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Routes } from 'service/routing';

export const App: React.FunctionComponent = () => {
  const muiTheme = useMuiTheme();
  const logger = useMemo(() => new PinoWrapper(), []);
  const queryClient = useMemo(() => new QueryClient(), []);
  const backendClient = useBackendClient();

  return (
    <RecoilRoot>
      <LoggerProvider value={logger}>
        <ThemeProvider theme={muiTheme}>
          <StyledComponentsThemeProvider>
            <QueryClientProvider client={queryClient}>
              <HttpClientProvider client={backendClient}>
                <DAppProvider config={Config.DAppConfig}>
                  <CssBaseline />
                  <ChainChecker />
                  <Switch>
                    <Route path={Routes.claim} component={ClaimPage} />
                    <Route path={Routes.orbs} exact component={OrbsPage} />
                    <Route path={Routes.main} component={MainPage} />
                  </Switch>
                </DAppProvider>
              </HttpClientProvider>
            </QueryClientProvider>
          </StyledComponentsThemeProvider>
        </ThemeProvider>
      </LoggerProvider>
    </RecoilRoot>
  );
};
