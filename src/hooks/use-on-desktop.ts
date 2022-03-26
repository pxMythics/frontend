import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useOnDesktop = (): boolean => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.up('lg'));
};
