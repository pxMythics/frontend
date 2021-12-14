import { createTheme } from '@mui/material';
import { useMemo } from 'react';
import { DefaultTheme } from '@mui/system';

export const useMuiTheme = (): Partial<DefaultTheme> =>
  useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
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
