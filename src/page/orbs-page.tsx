import { Alert, Button } from '@mui/material';
import { useEthers } from '@usedapp/core';
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
import { ImageSlide, ImageSlideProps } from 'components/image-slide';
import { useLogger } from 'provider/logger-provider';
import { isNil } from 'ramda';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-spring-3d-carousel-2';
import { useRecoilState } from 'recoil';
import { isOnValidChainState } from 'service/state';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export const OrbsPage: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const [connected, setConnected] = useState<boolean>(false);
  const [connectionError, setConnectionError] = useState<string>();
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const [isOnValidChain] = useRecoilState(isOnValidChainState);
  const logger = useLogger();

  const imgSlides = useMemo(
    (): ImageSlideProps[] => [
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
    ],
    [],
  );

  const slides = useMemo(
    () =>
      imgSlides.map((imgSlide) => ({
        key: imgSlide.alt,
        content: <ImageSlide src={imgSlide.src} alt={imgSlide.alt} />,
      })),
    [imgSlides],
  );

  const onClaimOrb = useCallback(() => {
    if (!connected) {
      setConnected(true);
      activateBrowserWallet((error) => {
        logger.error(`error connecting: ${error.message}`);
        setConnectionError(error.message);
        setConnected(false);
        deactivate();
      });
    }
  }, [account, connected, setConnected, activateBrowserWallet, setConnectionError, deactivate]);

  useEffect((): void => {
    if (!isNil(account)) {
      if (!connected) {
        deactivate();
      } else if (isOnValidChain) {
        // claim orbs
        logger.log(`here`);
      }
    } else if (!connected && !isOnValidChain) {
      deactivate();
      setConnected(false);
    }
  }, [account, connected, isOnValidChain]);

  return (
    <>
      <Container>
        <CarouselContainer>
          <Carousel showNavigation={false} slides={slides} autoPlay interval={3} offsetRadius={1} />
        </CarouselContainer>
        <ContainerWithShadow shadowDistance={4} shadowWidth={240}>
          <ClaimButton onClick={onClaimOrb}>{t('orbs.claim.button.label')}</ClaimButton>
        </ContainerWithShadow>
      </Container>
      {connectionError && (
        <StyledAlert
          variant="filled"
          severity="error"
          onClose={() => setConnectionError(undefined)}
        >
          {connectionError}
        </StyledAlert>
      )}
    </>
  );
};

const Container = styled(Column)`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: radial-gradient(50% 50% at 50% 50%, #2362c0 0%, #101924 100%);
  padding: 24px;
`;

const CarouselContainer = styled(Box)`
  width: 100%;
  height: 242px;
  ${(props): string => props.theme.mediaQueries.desktop} {
    width: 800px;
    height: 360px;
  }
`;

const ClaimButton = styled(Button)`
  && {
    margin-top: 64px;
    background: ${(props): FlattenSimpleInterpolation | null => css`
      linear-gradient(180deg,
        ${props.theme.palette.primaryGradientStart.main} 49.38%,
        ${props.theme.palette.primaryGradientFinish.main} 100%,
      ${props.theme.palette.primaryGradientFinish.main} 100%,
      ${props.theme.palette.primaryGradientFinish.main} 100%);
    `};
    border-radius: 12px;
    border: 2px solid #ffffff;
    color: #fff;
    font-weight: bold;
    font-size: 12px;
    height: 40px;
    ${(props): string => props.theme.mediaQueries.desktop} {
      margin-top: 128px;
    }
    :focus {
      outline: none;
    }
  }
`;

const StyledAlert = styled(Alert)`
  && {
    border-radius: 0;
  }
`;
