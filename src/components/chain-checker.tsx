import { Alert } from '@mui/material';
import { useChainId } from 'hooks/use-chain-id';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { isNilOrEmpty } from 'utils/ramda-utils';

// TODO: Adjust without moralis
export const ChainChecker: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const chainId = useChainId();
  const [currentChainId, setCurrentChainId] = useState<number>();
  const [eventListenersAdded, setEventListenersAdded] = useState<boolean>(false);
  // const { Moralis, isInitialized, isWeb3Enabled, isAuthenticated, web3, logout } = useMoralis();

  // useEffect((): void => {
  //   if (isInitialized && isWeb3Enabled && !eventListenersAdded) {
  //     Moralis.Web3.onChainChanged((chainId) => {
  //       setCurrentChainId(chainId);
  //       logout();
  //     });
  //     Moralis.Web3.onConnect((connectInfo) => {
  //       setCurrentChainId(connectInfo.chainId);
  //     });
  //     Moralis.Web3.onAccountsChanged(() => {
  //       logout();
  //     });
  //     setEventListenersAdded(true);
  //   }
  // }, [isInitialized, isWeb3Enabled]);

  // useEffect((): void => {
  //   if (isNilOrEmpty(currentChainId) && isAuthenticated) {
  //     // TODO get chain id
  //   }
  // });

  const isChainValid = useCallback(() => currentChainId === chainId, [currentChainId, chainId]);

  if (isChainValid()) {
    return null;
  }

  return (
    <Alert variant="filled" severity="error">
      {t('alert.invalidChain', {
        // invalidNetworkName: getChainName(currentChainId as ChainId),
        invalidNetworkId: currentChainId,
        // validNetworkName: getChainName(chainId),
        validNetworkId: chainId,
      })}
    </Alert>
  );
};
