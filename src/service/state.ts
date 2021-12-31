import { atom } from 'recoil';

export const isMobileMenuOpen = atom<boolean>({
  key: 'isMobileMenuOpen',
  default: false,
});
