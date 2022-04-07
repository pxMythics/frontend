import { Alert } from '@mui/material';
import { useContractFunction } from '@usedapp/core';
import { OrbsButton } from 'components/orbs/orbs-button';
import { useOrbContract } from 'hooks/use-contract';
import { MintResponse } from 'model/api/mint-response';
import { useLogger } from 'provider/logger-provider';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ethers } from 'ethers';
import styled from 'styled-components';

interface Props {
  mintResponse: MintResponse;
}

export const ClaimButton: React.FunctionComponent<Props> = ({ mintResponse }) => {
  const { t } = useTranslation();
  const contract = useOrbContract();
  const logger = useLogger();
  const { state, send } = useContractFunction(contract, 'mintWhitelist');

  useEffect((): void => {
    const mintCount = mintResponse.nonce!;
    send(
      mintCount,
      mintResponse!.proof!.map((value) => `0x${value}`),
      {
        gasLimit: ethers.utils.hexlify(157660 * mintCount),
      },
    );
  }, []);

  if (state?.status === 'Fail' || state?.status === 'Exception') {
    logger.error(`Error minting: ${state?.errorMessage}`);
    return (
      <>
        <StyledAlert variant="filled" severity="error" onClose={() => window.location.reload()}>
          {t('orbs.claim.error')}
        </StyledAlert>
        <OrbsButton disabled>{t('orbs.claim.button.claiming')}</OrbsButton>;
      </>
    );
  }
  if (state?.status === 'Success') {
    return <OrbsButton disabled>{t('orbs.claim.button.success')}</OrbsButton>;
  }
  return <OrbsButton disabled>{t('orbs.claim.button.claiming')}</OrbsButton>;
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
