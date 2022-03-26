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
import { useMediaValues } from 'hooks/use-media-values';
import { useOnDesktop } from 'hooks/use-on-desktop';
import { toPairs } from 'ramda';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-spring-3d-carousel-2';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export const HeroSection: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const isDesktop = useOnDesktop();
  const logoWidth = useMediaValues<number>({ phone: 313, desktop: 532 });
  const logoHeight = useMediaValues<number>({ phone: 91, desktop: 155 });

  const slides = toPairs({ thor: thor, amaterasu: amaterasu, quetzalcoatl: quetzalcoatl }).map(
    (value) => ({
      key: value[0],
      content: <ImageSlide src={value[1]} alt={t(`hero.${value[0]}Alt`)} />,
    }),
  );

  return (
    <Container id={Section.HOME}>
      <DesktopContainer>
        <CarouselContainer>
          <Carousel showNavigation={false} slides={slides} autoPlay={true} interval={3} />
        </CarouselContainer>
        <CenteredColumn>
          <Title variant={isDesktop ? 'h2' : 'h3'}>{t('hero.title')}</Title>
          <StyledLogo width={logoWidth} height={logoHeight} />
          <TitlePt2 variant={'h3'}>{t('hero.subtitle')}</TitlePt2>
        </CenteredColumn>
        {/*<ContainerWithShadow>*/}
        {/*  <MintButton size={'long'} />*/}
        {/*</ContainerWithShadow>*/}
      </DesktopContainer>
    </Container>
  );
};

const Container = styled(Column)`
  width: 100%;
  padding: 84px 46px 90px;
  background: url(${background});
  background-size: cover;
  align-items: center;
  ${(props) => props.theme.mediaQueries.desktop} {
    padding: 120px 32px 72px;
  }
`;

const DesktopContainer = styled(Column)`
  width: 100%;
  align-items: center;
  max-width: 1000px;
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
  justify-content: center;
`;

const StyledLogo = styled(Logo)`
  transform: translateY(-21px);
  ${(props): string => props.theme.mediaQueries.desktop} {
    transform: translateY(-48px);
  }
`;

const Title = styled(Typography)`
  && {
    color: ${(props): FlattenSimpleInterpolation | null => css`
      ${props.theme.palette.primary.main}
    `};
  }
`;

const TitlePt2 = styled(Typography)`
  && {
    transform: translateY(-21px);
    ${(props) => props.theme.mediaQueries.desktop} {
      transform: translateY(-48px);
    }
  }
`;
