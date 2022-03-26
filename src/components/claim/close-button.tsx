import { CloseSvg } from 'components/claim/close.svg';
import { Link } from 'react-router-dom';
import React from 'react';
import { Routes } from 'service/routing';
import styled from 'styled-components';

interface Props {
  visible?: boolean;
}

export const CloseButton: React.FunctionComponent<Props> = ({ visible, ...rest }) => (
  <StyledLink to={Routes.main} visible={visible} {...rest}>
    <CloseSvg />
  </StyledLink>
);

const StyledLink = styled(({ visible, ...rest }) => <Link {...rest} />)<{ visible?: boolean }>`
  line-height: 0;
  border: 2.4px solid #ffffff;
  padding: 10px;
  transition: opacity linear 1500ms;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;
