import { Alert } from '@mui/material';
import { useEthers } from '@usedapp/core';
import { ClaimButton } from 'components/orbs/claim-button';
import { OrbsButton } from 'components/orbs/orbs-button';
import { MintResponse } from 'model/api/mint-response';
import { useHttpClient } from 'provider/http-client-provider';
import { useLogger } from 'provider/logger-provider';
import { isNil } from 'ramda';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export const ClaimFetchButton: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const httpClient = useHttpClient();
  const { account } = useEthers();
  const logger = useLogger();
  const [error, setError] = useState<boolean>(false);
  const [mintResponse, setMintResponse] = useState<MintResponse>();

  useEffect((): void => {
    httpClient
      .post<MintResponse>('mint', { address: account })
      .then((res) => {
        if (res.data && res.data?.mint) {
          logger.info(`got mint access: ${JSON.stringify(res.data)}`);
          setMintResponse(res.data);
        } else {
          logger.error(`error parsing mint access: ${JSON.stringify(res.data)}`);
          setError(true);
        }
      })
      .catch((error) => {
        logger.error(`error fetching mint access: ${error.message}`);
        setError(true);
      });
  }, [httpClient, account, logger]);

  if (!isNil(mintResponse)) {
    return <ClaimButton mintResponse={mintResponse} />;
  }

  return (
    <>
      <OrbsButton disabled>{t('orbs.claim.button.checking')}</OrbsButton>
      {error && (
        <StyledAlert variant="filled" severity="error" onClose={() => window.location.reload()}>
          {t('orbs.claim.error')}
        </StyledAlert>
      )}
    </>
  );
};

const StyledAlert = styled(Alert)`
  && {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-radius: 0;
  }
`;
