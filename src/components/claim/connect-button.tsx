import { useEthers } from '@usedapp/core';
import { useTimeout } from 'beautiful-react-hooks';
import { SquareSvg } from 'components/claim/square.svg';
import { isNil } from 'ramda';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export const ConnectButton: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { activateBrowserWallet, account } = useEthers();
  const [visible, setVisible] = useState(false);
  useTimeout(() => setVisible(true), 200);

  if (!isNil(account)) {
    return null;
  }

  return (
    <StyledButton onClick={activateBrowserWallet} visible={visible}>
      {t('claim.connect')}
      <TopLeftSquare />
      <TopRightSquare />
      <BottomLeftSquare />
      <BottomRightSquare />
    </StyledButton>
  );
};

const StyledButton = styled(({ visible, ...rest }) => <div {...rest} />)<{
  visible: boolean;
}>`
  position: relative;
  width: max-content;
  font-family: Joystix Monospace;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  padding: 8px 18px;
  color: #ffffff;
  background: ${(props) => props.theme.palette.claim.button};
  cursor: ${(props) => (props.visible ? 'pointer' : 'default')};
  transition: opacity linear 300ms;
  border: 2px solid #fff;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  user-select: none;
  align-self: center;
  ${(props) => props.theme.mediaQueries.desktop} {
    font-size: 24px;
    line-height: 29px;
    padding: 10px 22px;
  }
`;

const TopLeftSquare = styled(SquareSvg)`
  position: absolute;
  top: 5px;
  left: 5px;
`;

const TopRightSquare = styled(SquareSvg)`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const BottomLeftSquare = styled(SquareSvg)`
  position: absolute;
  bottom: 5px;
  left: 5px;
`;

const BottomRightSquare = styled(SquareSvg)`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;
