import { createTheme } from '@mui/material';
import { useMemo } from 'react';
import { DefaultTheme } from '@mui/system';

declare module '@mui/material/styles' {
  interface Palette {
    primaryGradientStart: Palette['primary'];
    primaryGradientFinish: Palette['primary'];
    secondaryGradientStart: Palette['primary'];
    secondaryGradientFinish: Palette['primary'];
    claim: {
      bg: string;
      input: string;
      button: string;
    };
  }

  interface PaletteOptions {
    primaryGradientStart: PaletteOptions['primary'];
    primaryGradientFinish: PaletteOptions['primary'];
    secondaryGradientStart: PaletteOptions['primary'];
    secondaryGradientFinish: PaletteOptions['primary'];
    claim: {
      bg: string;
      input: string;
      button: string;
    };
  }
}

export const useMuiTheme = (): Partial<DefaultTheme> => {
  const theme = useMemo(
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
          claim: {
            bg: '#2F263B',
            input: '#FFBF0A',
            button: '#181421',
          },
        },
        breakpoints: {
          values: {
            xs: 320,
            sm: 600,
            md: 768,
            lg: 1200,
            xl: 1536,
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
  theme.typography = {
    ...theme.typography,
    fontFamily: 'Press Start 2P, Roboto',
    h1: {
      fontFamily: `'Press Start 2P'`,
      fontSize: '50px',
      lineHeight: '50px',
      color: theme.palette.primary.main,
      textAlign: 'center',
      [theme.breakpoints.up('lg')]: {
        fontSize: '116px',
        lineHeight: '116px',
      },
    },
    h2: {
      fontFamily: `'Press Start 2P'`,
      fontSize: '50px',
      lineHeight: '50px',
      textAlign: 'center',
      [theme.breakpoints.up('lg')]: {
        fontSize: '80px',
        lineHeight: '80px',
      },
      color: 'white',
    },
    h3: {
      fontFamily: `'Press Start 2P'`,
      fontSize: '30px',
      lineHeight: '30px',
      textAlign: 'center',
      [theme.breakpoints.up('lg')]: {
        fontSize: '60px',
        lineHeight: '60px',
      },
      color: theme.palette.primary.main,
    },
    h4: {
      fontWeight: 700,
      fontSize: '28px',
      lineHeight: '33px',
      [theme.breakpoints.up('lg')]: {
        fontSize: '48px',
        lineHeight: '56px',
      },
    },
    h5: {
      fontWeight: 700,
      fontSize: '20px',
      lineHeight: '23px',
      [theme.breakpoints.up('lg')]: {
        fontSize: '24px',
        lineHeight: '28px',
      },
      color: 'black',
    },
    h6: {
      fontFamily: `'Press Start 2P'`,
      fontSize: '32px',
      lineHeight: '32px',
      [theme.breakpoints.up('lg')]: {
        fontSize: '44px',
        lineHeight: '54px',
      },
      color: theme.palette.secondaryGradientStart.main,
    },
    body1: {
      fontSize: '16px',
      lineHeight: '18px',
      [theme.breakpoints.up('lg')]: {
        fontSize: '18px',
        lineHeight: '22px',
      },
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
    subtitle2: {
      fontSize: '16px',
      lineHeight: '19px',
      [theme.breakpoints.up('lg')]: {
        lineHeight: '20px',
      },
      color: 'black',
    },
    caption: {
      fontFamily: `'Press Start 2P'`,
      fontSize: '24px',
      lineHeight: '24px',
      color: 'white',
    },
    button: {
      textTransform: 'unset',
    },
  };
  return theme;
};
