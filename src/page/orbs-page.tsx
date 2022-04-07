import sol from 'assets/img/orbs/morb01_sol.gif';
import luna from 'assets/img/orbs/morb02_luna.gif';
import gaia from 'assets/img/orbs/morb03_gaia.gif';
import mercury from 'assets/img/orbs/morb04_mercury.gif';
import venus from 'assets/img/orbs/morb05_venus.gif';
import mars from 'assets/img/orbs/morb06_mars.gif';
import jupiter from 'assets/img/orbs/morb07_jupiter.gif';
import saturn from 'assets/img/orbs/morb08_saturn.gif';
import uranus from 'assets/img/orbs/morb09_uranus.gif';
import neptune from 'assets/img/orbs/morb10_neptune.gif';
import { Box } from 'components/base/box';
import { Column } from 'components/base/column';
import { ContainerWithShadow } from 'components/base/container-with-shadow';
import { ImageSlide } from 'components/image-slide';
import { ConnectButton } from 'components/orbs/connect-button';
import React, { useEffect } from 'react';
import Carousel from 'react-spring-3d-carousel-2';
import styled from 'styled-components';

export const OrbsPage: React.FunctionComponent = () => {
  const slides = [
    {
      src: sol,
      alt: 'sol',
    },
    {
      src: luna,
      alt: 'luna',
    },
    {
      src: gaia,
      alt: 'gaia',
    },
    {
      src: mercury,
      alt: 'mercury',
    },
    {
      src: venus,
      alt: 'venus',
    },
    {
      src: mars,
      alt: 'mars',
    },
    {
      src: jupiter,
      alt: 'jupiter',
    },
    {
      src: saturn,
      alt: 'saturn',
    },
    {
      src: uranus,
      alt: 'uranus',
    },
    {
      src: neptune,
      alt: 'neptune',
    },
  ].map((imgSlide) => ({
    key: imgSlide.alt,
    content: <ImageSlide src={imgSlide.src} alt={imgSlide.alt} />,
  }));

  const audio = new Audio('https://storage.googleapis.com/pxmythics-audio/orbs.mp3');
  useEffect(() => {
    audio.addEventListener('canplaythrough', () => {
      audio.loop = true;
      audio.play();
    });
    return () => {
      audio.pause();
    };
  }, []);

  return (
    <>
      <Container>
        <CarouselContainer>
          <Carousel showNavigation={false} slides={slides} autoPlay interval={3} offsetRadius={1} />
        </CarouselContainer>
        <ContainerWithShadow shadowDistance={4} shadowWidth={240}>
          <ConnectButton />
        </ContainerWithShadow>
      </Container>
    </>
  );
};

const Container = styled(Column)`
  height: 100%;
  min-height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: radial-gradient(50% 50% at 50% 50%, #2362c0 0%, #101924 100%);
  padding: 24px;
`;

const CarouselContainer = styled(Box)`
  width: 375px;
  height: 242px;
  ${(props): string => props.theme.mediaQueries.tablet} {
    width: 440px;
    height: 360px;
  }
  ${(props): string => props.theme.mediaQueries.desktop} {
    width: 800px;
    height: 360px;
  }
`;
