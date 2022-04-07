import { Alert } from '@mui/material';
import { useCall, useEthers } from '@usedapp/core';
import { ClaimFetchButton } from 'components/orbs/claim-fetch-button';
import { ClaimedButton } from 'components/orbs/claimed-button';
import { OrbsButton } from 'components/orbs/orbs-button';
import { useOrbContract } from 'hooks/use-contract';
import { useLogger } from 'provider/logger-provider';
import { isNil } from 'ramda';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export const ClaimCheckButton: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const contract = useOrbContract();
  const { account } = useEthers();
  const logger = useLogger();

  const { value, error } =
    useCall(
      account &&
        contract && {
          contract,
          method: 'addressToMintCount',
          args: [account],
        },
    ) ?? {};

  if (!isNil(value)) {
    logger.info(`Claimed ${value[0]} orbs so far`);
    if (value[0] > 0) {
      return <ClaimedButton />;
    } else {
      return <ClaimFetchButton />;
    }
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
