import { Theme, useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import 'styled-components';
import { ThemeProvider } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    mediaQueries: {
      xs: string;
      tablet: string;
      desktop: string;
      xl: string;
    };
  }
}

export const StyledComponentsThemeProvider: React.FunctionComponent = ({ children }) => {
  const theme = useTheme();
  const mediaQueries = useMemo(
    () => ({
      mediaQueries: {
        xs: theme.breakpoints.down('xs'),
        tablet: theme.breakpoints.between('md', 'lg'),
        desktop: theme.breakpoints.up('lg'),
        xl: theme.breakpoints.up('xl'),
      },
    }),
    [theme.breakpoints],
  );

  return <ThemeProvider theme={Object.assign(mediaQueries, theme)}>{children}</ThemeProvider>;
};
