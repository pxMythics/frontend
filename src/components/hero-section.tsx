import { Box } from 'components/base/box';
import React from 'react';
import styled from 'styled-components';
import background from 'assets/img/hero-background.png';

interface Props {}

export const HeroSection: React.FunctionComponent<Props> = () => {
  return (
    <Container>
      <Background src={background} alt={'test'} />
    </Container>
  );
};

const Container = styled(Box)`
  height: 870px;
`;

const Background = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
