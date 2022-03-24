import { Typography } from '@mui/material';
import amaterasu from 'assets/img/amaterasu.gif';
import background from 'assets/img/hero-background.png';
import { ReactComponent as Logo } from 'assets/img/logo.svg';
import quetzalcoatl from 'assets/img/quetzalcoatl.gif';
import thor from 'assets/img/thor.gif';
import { Box } from 'components/base/box';
import { Column } from 'components/base/column';
import { ImageSlide } from 'components/image-slide';
import { Section } from 'constant';
import { toPairs } from 'ramda';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-spring-3d-carousel-2';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export const HeroSection: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const slides = toPairs({ thor: thor, amaterasu: amaterasu, quetzalcoatl: quetzalcoatl }).map(
    (value) => ({
      key: value[0],
      content: <ImageSlide src={value[1]} alt={t(`hero.${value[0]}Alt`)} />,
    }),
  );

  return (
    <Container id={Section.HOME}>
      <CarouselContainer>
        <Carousel showNavigation={false} slides={slides} autoPlay={true} interval={3} />
      </CarouselContainer>
      <CenteredColumn>
        <StyledTypography variant={'h2'}>{t('hero.title')}</StyledTypography>
        <AbsolutePosLogo>
          <Logo />
        </AbsolutePosLogo>
        <Typography variant={'h3'}>{t('hero.subtitle')}</Typography>
      </CenteredColumn>
      {/*<ContainerWithShadow>*/}
      {/*  <MintButton size={'long'} />*/}
      {/*</ContainerWithShadow>*/}
    </Container>
  );
};

const Container = styled(Column)`
  padding-top: 120px;
  height: 660px;
  ${(props): string => props.theme.mediaQueries.desktop} {
    height: 870px;
  }
  background: url(${background});
  background-size: cover;
  align-items: center;
`;

const CarouselContainer = styled(Box)`
  width: 30%;
  height: 242px;
  ${(props): string => props.theme.mediaQueries.desktop} {
    height: 360px;
  }
`;

const CenteredColumn = styled(Column)`
  align-items: center;
  padding-bottom: 40px;
`;

const AbsolutePosLogo = styled(Box)`
  width: 100%;
  justify-content: center;
  position: absolute;
  top: 24px;
  ${(props): string => props.theme.mediaQueries.desktop} {
    top: 48px;
  }
  > svg {
    width: 80%;
    height: 100%;
  }
`;

const StyledTypography = styled(Typography)`
  ${(props): string => props.theme.mediaQueries.desktop} {
    padding-bottom: 112px;
  }
  padding-bottom: 64px;
  color: ${(props): FlattenSimpleInterpolation | null => css`
    ${props.theme.palette.primary.main}
  `};
`;
