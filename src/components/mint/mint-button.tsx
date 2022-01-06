import { Button } from '@mui/material';
import { useEthers } from '@usedapp/core';
import { Modal } from 'components/base/modal';
import { MinterSwitch } from 'components/mint/minter-switch';
import { useMintAccess } from 'hooks/use-mint-access';
import { useModalControls } from 'hooks/use-modal-controls';
import { useTokenBalance } from 'hooks/use-token-balance';
import { MintType } from 'model/api/mint-response';
import { isNil } from 'ramda';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { isNilOrEmpty } from 'utils/ramda-utils';

interface Props {
  size?: 'long' | 'short';
}

export const MintButton: React.FunctionComponent<Props> = ({ size = 'short' }) => {
  const { t } = useTranslation();
  const { activateBrowserWallet, account } = useEthers();
  const { fetching, mintType, mintCount, proof, nonce, error } = useMintAccess();
  const [modalShown, showModal, hideModal] = useModalControls();
  const tokenBalance = useTokenBalance();

  const isLoading = useCallback(() => fetching || isNil(tokenBalance), [fetching, tokenBalance]);

  const limitReached = useCallback(() => {
    if (mintType === MintType.WHITELIST && tokenBalance === 1) {
      return true;
    } else if (mintType === MintType.FREE && tokenBalance === mintCount) {
      return true;
    }
    return false;
  }, [mintType, tokenBalance, mintCount]);

  const buttonTitleKey = useCallback(() => {
    const prefix = `mintButton.${size}`;
    let suffix = 'notConnected';
    if (!isNilOrEmpty(account) && isNil(error)) {
      if (isLoading()) {
        suffix = 'fetching';
      } else if (mintType === MintType.FREE) {
        suffix = `free.${limitReached() ? 'disabled' : 'enabled'}`;
      } else if (mintType === MintType.WHITELIST) {
        suffix = `whitelist.${limitReached() ? 'disabled' : 'enabled'}`;
      }
    }
    if (error && mintType === MintType.NONE) {
      suffix = 'disabled';
    }
    return `${prefix}.${suffix}`;
  }, [account, error, mintType, isLoading, limitReached, size]);

  const buttonDisabled = useCallback(
    () =>
      !isNilOrEmpty(account) &&
      (isLoading() || (!isNil(error) && mintType === MintType.NONE) || limitReached()),
    [account, isLoading, mintType, error, limitReached],
  );

  const onMintClick = useCallback(
    () => (isNilOrEmpty(account) ? activateBrowserWallet() : showModal()),
    [account, mintCount, mintType, nonce, proof],
  );

  return (
    <>
      <StyledButton
        onClick={onMintClick}
        disabled={true}
        variant="contained"
        isLong={size === 'long'}
      >
        {t(buttonTitleKey(), { count: (mintCount ?? 0) - (tokenBalance ?? 0) })}
      </StyledButton>
      {mintType !== MintType.NONE && (
        <Modal open={modalShown}>
          <MinterSwitch
            mintType={mintType}
            mintCount={mintCount}
            nonce={nonce}
            proof={proof}
            onTransactionDone={hideModal}
          />
        </Modal>
      )}
    </>
  );
};

const StyledButton = styled(({ isLong, ...renderProps }) => <Button {...renderProps} />)<{
  isLong: boolean;
}>`
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
    min-width: 120px;
    ${(props) => {
      if (props.isLong) {
        return css`
          border: 2px solid #ffffff;
          font-weight: bold;
          font-size: 12px;
          height: 40px;
          ${(props): string => props.theme.mediaQueries.desktop} {
            height: 60px;
            font-size: 18px;
          } ;
        `;
      } else {
        return css`
          height: 40px;
          font-size: 16px;
        `;
      }
    }};
  }
`;
