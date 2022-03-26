import { Typography } from '@mui/material';
import useComponentSize from '@rehooks/component-size';
import anubis from 'assets/img/anubis.jpeg';
import chaac from 'assets/img/chaac.png';
import kaishen from 'assets/img/kaishen.png';
import { ReactComponent as Logo } from 'assets/img/logo.svg';
import odin from 'assets/img/odin.png';
import raijin from 'assets/img/raijin.png';
import shiva from 'assets/img/shiva.png';
import { BaseButton } from 'components/base/base-button';
import { BaseLink } from 'components/base/base-link';
import { Box } from 'components/base/box';
import { Column } from 'components/base/column';
import { Section } from 'constant';
import { useMediaValues } from 'hooks/use-media-values';
import { useOnDesktop } from 'hooks/use-on-desktop';
import { splitEvery } from 'ramda';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes } from 'service/routing';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export const AboutSection: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const isDesktop = useOnDesktop();
  const containerRef = useRef(null);
  const { width } = useComponentSize(containerRef);
  const logoWidth = useMediaValues<number>({ phone: 270, desktop: 480 });
  const logoHeight = useMediaValues<number>({ phone: 79, desktop: 140 });
  // width divided by image size (138px)
  let mobileImageCount = Math.floor(width / 138);
  if (mobileImageCount === 0) {
    mobileImageCount = 1;
  }
  // (width - imageCount*image size (138px))/(imageCount - 1)
  let mobileGapSize =
    mobileImageCount === 1
      ? 0
      : Math.floor((width - mobileImageCount * 138) / (mobileImageCount - 1));
  // set max gap size to 24px
  if (mobileGapSize > 24) {
    mobileGapSize = 24;
  }
  const imagesSet = splitEvery<string>(isDesktop ? 3 : mobileImageCount, [
    shiva,
    chaac,
    raijin,
    kaishen,
    anubis,
    odin,
  ]);

  return (
    <Container id={Section.ABOUT}>
      <DesktopContainer>
        <TitleAndTextContainer>
          <TitleColumn>
            <Typography variant={'h2'}>{t('about.title')}</Typography>
            <StyledLogo width={logoWidth} height={logoHeight} />
          </TitleColumn>
          <TextContainer>
            <Typography variant={'body1'}>{t('about.text1')}</Typography>
            <br />
            <Typography variant={'body1'}>{t('about.text2')}</Typography>
            <br />
            <Typography variant={'body1'}>{t('about.text3')}</Typography>
            <br />
            <Typography variant={'body1'}>{t('about.text4')}</Typography>
            <ClaimLink to={Routes.claim}>
              <ClaimButton>{t('about.claim.button')}</ClaimButton>
            </ClaimLink>
          </TextContainer>
        </TitleAndTextContainer>
        <ImageContainer innerRef={containerRef}>
          {imagesSet.map((images, index) => (
            <ImageRow key={index} gapSize={mobileGapSize}>
              {images.map((image) => (
                <StyledImg key={image} src={image} alt={t('about.god')} />
              ))}
            </ImageRow>
          ))}
        </ImageContainer>
      </DesktopContainer>
    </Container>
  );
};

const Container = styled(Column)`
  width: 100%;
  padding: 64px 46px;
  background: ${(props): FlattenSimpleInterpolation | null => css`
    radial-gradient(51.41% 51.41% at 31.9% 48.59%, ${props.theme.palette.primaryGradientFinish.main} 0%, #101924 99.83%);
    `};
  ${(props) => props.theme.mediaQueries.desktop} {
    padding: 95px 32px 135px;
    align-items: center;
  }
`;

const DesktopContainer = styled(Column)`
  width: 100%;
  ${(props) => props.theme.mediaQueries.desktop} {
    flex-direction: row-reverse;
    max-width: 1000px;
  }
`;

const TitleAndTextContainer = styled(Column)`
  flex: 1 1 auto;
`;

const StyledImg = styled.img`
  width: 138px;
  height: 138px;
  border: 1px solid white;
  filter: drop-shadow(0px 10px 8px rgba(0, 0, 0, 0.15));
  border-radius: 10px;
  ${(props) => props.theme.mediaQueries.desktop} {
    width: 160px;
    height: 160px;
  }
`;

const ImageContainer = styled(Column)`
  gap: 30px;
  align-items: center;
  width: 100%;
  ${(props) => props.theme.mediaQueries.desktop} {
    flex-direction: row;
    gap: 24px;
    width: unset;
  }
`;

const ImageRow = styled(({ gapSize, ...rest }) => <Box {...rest} />)<{ gapSize: number }>`
  gap: ${(props) => props.gapSize}px;
  ${(props) => props.theme.mediaQueries.desktop} {
    flex-direction: column;
    gap: 32px;
  }
`;

const TextContainer = styled(Column)`
  width: 100%;
  margin: 0 0 48px;
  transform: translateY(-12px);
  ${(props) => props.theme.mediaQueries.desktop} {
    flex: 1 1 auto;
    margin: 0 0 0 60px;
  }
`;

const TitleColumn = styled(Column)`
  align-items: center;
`;

const StyledLogo = styled(Logo)`
  transform: translateY(-21px);
  ${(props): string => props.theme.mediaQueries.desktop} {
    transform: translate(48px, -32px);
  }
`;

const ClaimLink = styled(BaseLink)`
  margin-top: 36px;
  align-self: center;
  ${(props) => props.theme.mediaQueries.desktop} {
    align-self: unset;
  }
`;
const ClaimButton = styled(BaseButton)`
  && {
    color: white;
  }
`;
