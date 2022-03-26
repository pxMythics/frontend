import { useOnDesktop } from 'hooks/use-on-desktop';

interface Values<T> {
  phone: T;
  desktop: T;
}

export const useMediaValues = <T>(values: Values<T>): T => {
  const isOnDesktop = useOnDesktop();

  if (isOnDesktop) {
    return values.desktop;
  } else {
    return values.phone;
  }
};
