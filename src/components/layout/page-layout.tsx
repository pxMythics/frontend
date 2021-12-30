import { AppBar } from 'components/base/app-bar';
import { Column } from 'components/base/column';
import React from 'react';
import styled from 'styled-components';

export const PageLayout: React.FunctionComponent = ({ children }) => (
  <Container>
    <AppBar />
    <ChildrenContainer>{children}</ChildrenContainer>
  </Container>
);

const Container = styled(({ ...rest }) => <Column {...rest} />)`
  width: 100%;
  height: 100%;
`;
const ChildrenContainer = styled(({ ...rest }) => <Column {...rest} />)`
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
`;
