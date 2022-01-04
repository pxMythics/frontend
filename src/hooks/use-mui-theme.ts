import { createTheme } from '@mui/material';
import { useMemo } from 'react';
import { DefaultTheme } from '@mui/system';
import PressStart2P from 'assets/fonts/press-start-2p.ttf';

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
          info: {
            main: '#f8da3e',
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
          action: {
            disabled: '#FF7373',
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
          MuiCssBaseline: {
            styleOverrides: `
        @font-face {
          font-family: 'Press Start 2P';
          font-style: normal;
          font-weight: 400;
          src: local('Press Start 2P'), url(${PressStart2P}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
          },
        },
        typography: {
          fontFamily: 'Press Start 2P, Roboto',
          h2: {
            fontFamily: `'Press Start 2P'`,
            fontSize: '80px',
            lineHeight: '80px',
            color: 'white',
          },
          h3: {
            fontFamily: `'Press Start 2P'`,
            fontSize: '60px',
            lineHeight: '60px',
            color: '#0049B5',
          },
          body1: {
            fontSize: '18px',
            lineHeight: '22px',
            color: 'white',
          },
          body2: {
            fontWeight: 500,
            fontSize: '20px',
            color: 'white',
          },
          subtitle1: {
            fontFamily: `'Press Start 2P'`,
            fontSize: '20px',
            color: 'white',
          },
          button: {
            textTransform: 'unset',
          },
        },
      }),
    [],
  );
