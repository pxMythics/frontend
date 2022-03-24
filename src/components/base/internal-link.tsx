import { Link } from '@mui/material';
import { Section } from 'constant';
import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { getSectionRef } from 'utils/string-utils';

interface Props {
  to: Section;
  onClick?: MouseEventHandler;
}

export const InternalLink: React.FunctionComponent<Props> = ({ to, ...rest }) => (
  <StyledLink underline="none" href={getSectionRef(to)} {...rest} />
);

const StyledLink = styled(Link)`
  && {
    color: white;
    text-decoration: none;
  }
`;
