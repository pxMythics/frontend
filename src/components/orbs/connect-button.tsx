import { Alert } from '@mui/material';
import { useEthers } from '@usedapp/core';
import { ClaimCheckButton } from 'components/orbs/claim-check-button';
import { OrbsButton } from 'components/orbs/orbs-button';
import { isNil } from 'ramda';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export const ConnectButton: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { activateBrowserWallet, account, error } = useEthers();

  return (
    <>
      {isNil(account) ? (
        <OrbsButton onClick={activateBrowserWallet}>{t('orbs.claim.button.claim')}</OrbsButton>
      ) : (
        <ClaimCheckButton />
      )}
      {error && (
        <StyledAlert variant="filled" severity="error">
          {error}
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
