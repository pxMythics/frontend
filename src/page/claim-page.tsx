import { Column } from 'components/base/column';
import React from 'react';
import styled from 'styled-components';

export const ClaimPage: React.FunctionComponent = () => {
  return <Container>{}</Container>;
};

const Container = styled(Column)`
  height: 100vh;
  width: 100vw;
  background: ${(props) => props.theme.palette.claim.bg};
`;
