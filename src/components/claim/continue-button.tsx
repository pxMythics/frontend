import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface Props {
  onContinue?: VoidFunction;
  visible?: boolean;
}

export const ContinueButton: React.FunctionComponent<Props> = ({
  onContinue,
  visible,
  ...rest
}) => {
  const { t } = useTranslation();
  return (
    <StyledButton onClick={onContinue} visible={visible} {...rest}>
      {t('claim.continue')}
    </StyledButton>
  );
};

const StyledButton = styled(({ visible, ...rest }) => <div {...rest} />)<{
  visible: boolean;
}>`
  font-family: Joystix Monospace;
  width: max-content;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  color: #ffffff;
  padding: 10px 22px;
  background: ${(props) => props.theme.palette.claim.button};
  cursor: ${(props) => (props.visible ? 'pointer' : 'default')};
  transition: opacity linear 1s;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  user-select: none;
`;
