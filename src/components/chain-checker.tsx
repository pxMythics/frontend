import { Alert } from '@mui/material';
import { useConfig, useEthers } from '@usedapp/core';
import { getChainName } from 'helper/chain-helper';
import { useLogger } from 'provider/logger-provider';
import { isNil } from 'ramda';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { isOnValidChainState } from 'service/state';
import styled from 'styled-components';

export const ChainChecker: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { chainId } = useEthers();
  const { readOnlyChainId } = useConfig();
  const [validChain, setIsOnValidChain] = useRecoilState(isOnValidChainState);
  const logger = useLogger();

  useEffect((): void => {
    if (!isNil(readOnlyChainId) && !isNil(chainId)) {
      setIsOnValidChain(chainId === readOnlyChainId);
    }
  }, [readOnlyChainId, chainId, setIsOnValidChain]);

  if (validChain === false) {
    logger.info(`chain ${chainId} is invalid.`);
    return (
      <StyledAlert variant="filled" severity="error">
        {t('alert.invalidChain', {
          invalidNetworkName: getChainName(chainId),
          invalidNetworkId: chainId,
          validNetworkName: getChainName(readOnlyChainId),
          validNetworkId: readOnlyChainId,
        })}
      </StyledAlert>
    );
  }
  if (!isNil(chainId)) {
    logger.info(`chain ${chainId} is valid.`);
  }
  return null;
};

const StyledAlert = styled(Alert)`
  && {
    border-radius: 0;
  }
`;
