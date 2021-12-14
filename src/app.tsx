import {CssBaseline, ThemeProvider} from '@mui/material';
import {ChainChecker} from 'components/chain-checker';
import {useMoralisAppId} from 'hooks/use-moralis-app-id';
import {useMoralisURL} from 'hooks/use-moralis-url';
import {useMuiTheme} from 'hooks/use-mui-theme';
import {MainPage} from 'page/main-page';
import {LoggerProvider, PinoWrapper} from 'provider/logger-provider';
import {StyledComponentsThemeProvider} from 'provider/styled-components-theme-provider';
import React, {useMemo} from 'react';
import {MoralisProvider} from 'react-moralis';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Route, Switch} from 'react-router-dom';
import {Routes} from 'service/routing';

export const App: React.FunctionComponent = () => {
  const muiTtheme = useMuiTheme();
  const logger = useMemo(() => new PinoWrapper(), []);
  const queryClient = useMemo(() => new QueryClient(), []);
  const moralisAppId = useMoralisAppId();
  const moralisURL = useMoralisURL();

  return (
      <LoggerProvider value={logger}>
        <ThemeProvider theme={muiTtheme}>
          <StyledComponentsThemeProvider>
            <MoralisProvider appId={moralisAppId} serverUrl={moralisURL}>
              <QueryClientProvider client={queryClient}>
                  <CssBaseline />
                  <ChainChecker />
                  <Switch>
                    <Route path={Routes.main} component={MainPage} />
                  </Switch>
              </QueryClientProvider>
            </MoralisProvider>
          </StyledComponentsThemeProvider>
        </ThemeProvider>
      </LoggerProvider>
  );
};
