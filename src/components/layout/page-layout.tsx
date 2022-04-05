import { AppBar } from 'components/base/app-bar';
import { Column } from 'components/base/column';
import { MobileSlidingMenu } from 'components/base/mobile-sliding-menu';
import React from 'react';
import styled from 'styled-components';
import { useOnMobile } from 'hooks/use-on-mobile';

export const PageLayout: React.FunctionComponent = ({ children }) => {
  const onMobile = useOnMobile();
  return (
    <Container>
      <AppBar />
      {onMobile && <MobileSlidingMenu />}
      <ChildrenContainer>{children}</ChildrenContainer>
    </Container>
  );
};

const Container = styled(Column)`
  width: 100%;
  height: 100%;
  scroll-behavior: smooth;
`;

const ChildrenContainer = styled(Column)`
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
  scroll-behavior: smooth;
`;
