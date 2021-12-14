import { useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import { ThemeProvider } from 'styled-components';

export const StyledComponentsThemeProvider: React.FunctionComponent = ({ children }) => {
  const theme = useTheme();
  const mediaQueries = useMemo(
    () => ({
      mediaQueries: {
        xs: theme.breakpoints.down('xs'),
        tablet: theme.breakpoints.up('md'),
        desktop: theme.breakpoints.up('lg'),
        xl: theme.breakpoints.up('xl'),
      },
    }),
    [],
  );

  return <ThemeProvider theme={Object.assign(mediaQueries, theme)}>{children}</ThemeProvider>;
};
