import { SquareSvg } from 'components/claim/square.svg';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface Props {
  onClaim?: VoidFunction;
  visible?: boolean;
}

export const ClaimButton: React.FunctionComponent<Props> = ({ onClaim, visible, ...rest }) => {
  const { t } = useTranslation();
  return (
    <StyledButton onClick={onClaim} visible={visible} {...rest}>
      {t('claim.claim')}
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
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  color: #ffffff;
  padding: 10px 22px;
  background: ${(props) => props.theme.palette.claim.button};
  cursor: ${(props) => (props.visible ? 'pointer' : 'default')};
  transition: opacity linear 300ms;
  border: 2px solid #fff;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  user-select: none;
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
