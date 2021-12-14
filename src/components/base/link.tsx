import React from 'react';
import { LinkProps } from 'react-router-dom';
import { Link as ReactRouterLink } from 'react-router-dom';
import styled from 'styled-components';

export const Link: React.FunctionComponent<LinkProps> = (props) => (
  <StyledReactRouterLink {...props} />
);

const StyledReactRouterLink = styled(ReactRouterLink)`
  text-decoration: none;
`;
