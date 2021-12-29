import { Button } from '@mui/material';
import { useEthers } from '@usedapp/core';
import { useMintAccess } from 'hooks/use-mint-access';
import { MintType } from 'model/api/mint-response';
import { isNil } from 'ramda';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { isNilOrEmpty } from 'utils/ramda-utils';

export enum MintButtonStyle {
  LONG = 'long',
  SHORT = 'short',
}
interface Props {
  style: MintButtonStyle;
}

export const MintButton: React.FunctionComponent<Props> = ({ style }) => {
  const { activateBrowserWallet, account } = useEthers();
  const { fetching, mintType, mintCount, proof, nonce, error } = useMintAccess();
  const { t } = useTranslation();

  const buttonTitleKey = useCallback(() => {
    const prefix = `mintButton.${style}`;
    let suffix = 'notConnected';
    if (!isNilOrEmpty(account) && isNil(error)) {
      if (fetching || isNilOrEmpty(account)) {
        suffix = 'notConnected';
      } else if (mintType === MintType.FREE) {
        // TODO: Need to check on contract the amount
        // suffix = `free.${limitReached ? 'disabled' : 'enabled'}`;
        suffix = `free.disabled`;
      } else if (mintType === MintType.WHITELIST) {
        // TODO: Need to check on contract the amount
        // suffix = `whitelist.${limitReached ? 'disabled' : 'enabled'}`;
        suffix = `whitelist.disabled`;
      }
    } else if (error) {
      suffix = 'disabled';
    }
    return `${prefix}.${suffix}`;
  }, [account, error, mintType, fetching, style]);

  //
  const onMintClick = useCallback(
    () => (isNilOrEmpty(account) ? activateBrowserWallet() : () => {}),
    [account],
  );
  return (
    <StyledButton onClick={onMintClick} disabled={fetching} variant="contained">
      {t(buttonTitleKey(), { count: mintCount })}
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  && {
    background: ${(props): FlattenSimpleInterpolation | null => css`
      linear-gradient(180deg, 
        ${props.theme.palette.primaryGradientStart.main} 49.38%, 
        ${props.theme.palette.primaryGradientFinish.main} 100%,
      ${props.theme.palette.primaryGradientFinish.main} 100%,
      ${props.theme.palette.primaryGradientFinish.main} 100%);
    `};
    mix-blend-mode: normal;
    box-shadow: 0 4px 4px rgba(90, 103, 214, 0.25);
    border-radius: 12px;
    height: 40px;
  }
`;
