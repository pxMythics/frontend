import { Typography } from '@mui/material';
import background from 'assets/img/hero-background.png';
import thor from 'assets/img/thor.gif';
import amaterasu from 'assets/img/amaterasu.gif';
import quetzalcoatl from 'assets/img/quetzalcoatl.gif';
import { Box } from 'components/base/box';
import { Column } from 'components/base/column';
import { ContainerWithShadow } from 'components/base/container-with-shadow';
import { MintButton } from 'components/mint/mint-button';
import { toPairs } from 'ramda';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { ReactComponent as Logo } from 'assets/img/logo.svg';
import Carousel from 'react-spring-3d-carousel-2';

interface ImageSlideProps {
  src: string;
  alt: string;
}
const ImageSlide: React.FunctionComponent<ImageSlideProps> = ({ src, alt }) => (
  <ContainerWithShadow>
    <ImageContainer>
      <img src={src} alt={alt} />
    </ImageContainer>
  </ContainerWithShadow>
);

export const HeroSection: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const slides = toPairs({ thor: thor, amaterasu: amaterasu, quetzalcoatl: quetzalcoatl }).map(
    (value) => ({
      key: value[0],
      content: <ImageSlide src={value[1]} alt={t(`hero.${value[0]}Alt`)} />,
    }),
  );
  return (
    <Container>
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
      <ContainerWithShadow>
        <MintButton size={'long'} />
      </ContainerWithShadow>
    </Container>
  );
};

const Container = styled(Column)`
  padding-top: 120px;
  height: 870px;
  background: url(${background});
  background-size: cover;
  align-items: center;
`;

const CarouselContainer = styled(Box)`
  width: 30%;
  height: 360px;
`;

const ImageContainer = styled(Box)`
  width: 290px;
  height: 290px;
  border: 3px solid
    ${(props): FlattenSimpleInterpolation | null => css`
      ${props.theme.palette.primaryGradientFinish.main}
    `};
  border-radius: 25px;
  overflow: hidden;
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
  > svg {
    width: 80%;
    height: 100%;
  }
`;

const StyledTypography = styled(Typography)`
  padding-bottom: 88px;
  color: ${(props): FlattenSimpleInterpolation | null => css`
    ${props.theme.palette.primary.main}
  `};
`;
