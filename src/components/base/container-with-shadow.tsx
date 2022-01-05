import { Column } from 'components/base/column';
import React from 'react';
import shadow from 'assets/img/shadow.png';
import styled from 'styled-components';

// TODO Does not work on mobile
export const ContainerWithShadow: React.FunctionComponent = ({ children, ...rest }) => {
  return (
    <Column {...rest}>
      {children}
      <StyledImg src={shadow} />
    </Column>
  );
};

const StyledImg = styled.img`
  padding-top: 24px;
  width: 100%;
  object-fit: cover;
`;
