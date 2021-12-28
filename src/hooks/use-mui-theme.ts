import { createTheme } from '@mui/material';
import { useMemo } from 'react';
import { DefaultTheme } from '@mui/system';

declare module '@mui/material/styles' {
  interface Palette {
    primaryGradientStart: Palette['primary'];
    primaryGradientFinish: Palette['primary'];
    secondaryGradientStart: Palette['primary'];
    secondaryGradientFinish: Palette['primary'];
  }

  interface PaletteOptions {
    primaryGradientStart: PaletteOptions['primary'];
    primaryGradientFinish: PaletteOptions['primary'];
    secondaryGradientStart: PaletteOptions['primary'];
    secondaryGradientFinish: PaletteOptions['primary'];
  }
}

export const useMuiTheme = (): Partial<DefaultTheme> =>
  useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: '#0049B5',
          },
          secondary: {
            main: '#FF7373',
          },
          primaryGradientStart: {
            main: '#2081E2',
          },
          primaryGradientFinish: {
            main: '#2362C0',
          },
          secondaryGradientStart: {
            main: '#5A3A71',
          },
          secondaryGradientFinish: {
            main: '#FF7373',
          },
        },
        breakpoints: {
          values: {
            xs: 321,
            sm: 601,
            md: 769,
            lg: 1025,
            xl: 1921,
          },
        },
        components: {
          MuiTypography: {
            defaultProps: {
              variantMapping: {
                body2: 'span',
              },
            },
          },
          MuiButtonBase: {
            defaultProps: {
              disableRipple: true,
            },
          },
        },
      }),
    [],
  );
