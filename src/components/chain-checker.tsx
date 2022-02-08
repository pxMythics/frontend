import { Alert } from '@mui/material';
import { useEthers } from '@usedapp/core';
import { getChainName } from 'helper/chain-helper';
import { useSupportedChains } from 'hooks/use-supported-chains';
import { useLogger } from 'provider/logger-provider';
import { includes, isNil } from 'ramda';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { isOnValidChainState } from 'service/state';
import styled from 'styled-components';
import { isNilOrEmpty } from 'utils/ramda-utils';

export const ChainChecker: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { chainId } = useEthers();
  const supportedChains = useSupportedChains();
  const [validChain, setIsOnValidChain] = useRecoilState(isOnValidChainState);
  const logger = useLogger();

  useEffect((): void => {
    if (!isNilOrEmpty(supportedChains) && !isNil(chainId)) {
      setIsOnValidChain(includes(chainId, supportedChains));
    }
  }, [supportedChains, chainId, setIsOnValidChain]);

  if (validChain === false) {
    logger.info(`chain ${chainId} is invalid.`);
    return (
      <StyledAlert variant="filled" severity="error">
        {t('alert.invalidChain', {
          invalidNetworkName: getChainName(chainId),
          invalidNetworkId: chainId,
          validNetworkName: supportedChains.map(getChainName).join(t('alert.or')),
          validNetworkId: supportedChains.join(t('alert.or')),
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
