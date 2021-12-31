import { Alert } from '@mui/material';
import { useEthers } from '@usedapp/core';
import { getChainName } from 'helper/chain-helper';
import { useChainId } from 'hooks/use-chain-id';
import { includes } from 'ramda';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const ChainChecker: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const configChainId = useChainId();
  const { chainId } = useEthers();

  const isChainValid = useCallback(
    () => includes(chainId, configChainId),
    [configChainId, chainId],
  );

  if (isChainValid()) {
    return null;
  }

  return (
    <Alert variant="filled" severity="error">
      {t('alert.invalidChain', {
        invalidNetworkName: getChainName(chainId),
        invalidNetworkId: chainId,
        validNetworkName: configChainId.map(getChainName).join(t('alert.or')),
        validNetworkId: configChainId.join(t('alert.or')),
      })}
    </Alert>
  );
};
