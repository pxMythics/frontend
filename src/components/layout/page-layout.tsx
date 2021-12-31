import { AppBar } from 'components/base/app-bar';
import { Column } from 'components/base/column';
import { MobileSlidingMenu } from 'components/base/mobile-sliding-menu';
import { useOnMobile } from 'hooks/use-on-mobile';
import React from 'react';
import styled from 'styled-components';

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

const Container = styled(({ ...rest }) => <Column {...rest} />)`
  width: 100%;
  height: 100%;
`;
const ChildrenContainer = styled(({ ...rest }) => <Column {...rest} />)`
  flex: 1 1 auto;
  width: 100%;
  height: 100%;
`;
