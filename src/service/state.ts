import { atom } from 'recoil';

export const isMobileMenuOpen = atom<boolean>({
  key: 'isMobileMenuOpen',
  default: false,
});

export const isOnValidChainState = atom<boolean | undefined>({
  key: 'isOnValidChainState',
  default: undefined,
});
