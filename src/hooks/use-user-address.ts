import { useMoralis } from 'react-moralis';

/**
 * Returns the user address, undefined if the wallet is not connected
 */
export const useUserAddress = (): string | undefined => {
  const { user, isAuthenticated } = useMoralis();
  if (!isAuthenticated) {
    return undefined;
  }
  return user?.get('ethAddress');
};
