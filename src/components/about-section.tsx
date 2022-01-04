import { Typography } from '@mui/material';
import anubis from 'assets/img/anubis.jpeg';
import chaac from 'assets/img/chaac.png';
import kaishen from 'assets/img/kaishen.png';
import { ReactComponent as Logo } from 'assets/img/logo.svg';
import odin from 'assets/img/odin.png';
import raijin from 'assets/img/raijin.png';
import shiva from 'assets/img/shiva.png';
import { Box } from 'components/base/box';
import { Column } from 'components/base/column';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export const AboutSection: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <ImageRow>
        <ImageColumn>
          <ImageContainer>
            <img src={shiva} alt={t('about.altShiva')} />
          </ImageContainer>
          <ImageContainer>
            <img src={chaac} alt={t('about.altChaac')} />
          </ImageContainer>
          <ImageContainer>
            <img src={raijin} alt={t('about.altRaijin')} />
          </ImageContainer>
        </ImageColumn>
        <ImageColumn>
          <ImageContainer>
            <img src={kaishen} alt={t('about.altKaishen')} />
          </ImageContainer>
          <ImageContainer>
            <img src={anubis} alt={t('about.altAnubis')} />
          </ImageContainer>
          <ImageContainer>
            <img src={odin} alt={t('about.altOdin')} />
          </ImageContainer>
        </ImageColumn>
      </ImageRow>
      <TextContainer>
        <PaddedColumn>
          <Typography variant={'h2'}>{t('about.title')}</Typography>
          <AbsolutePosLogo>
            <Logo />
          </AbsolutePosLogo>
        </PaddedColumn>
        <Typography variant={'body1'}>{t('about.text1')}</Typography>
        <br />
        <Typography variant={'body1'}>{t('about.text2')}</Typography>
        <br />
        <Typography variant={'body1'}>{t('about.text3')}</Typography>
        <br />
        <Typography variant={'body1'}>{t('about.text4')}</Typography>
      </TextContainer>
    </Container>
  );
};

const Container = styled(Box)`
  padding-top: 128px;
  height: 850px;
  background: ${(props): FlattenSimpleInterpolation | null => css`
    radial-gradient(51.41% 51.41% at 31.9% 48.59%, ${props.theme.palette.primaryGradientFinish.main} 0%, #101924 99.83%);
    `};
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled(Box)`
  width: 150px;
  height: 150px;
  border: 1px solid white;
  filter: drop-shadow(0px 10px 8px rgba(0, 0, 0, 0.15));
  border-radius: 10px;
  overflow: hidden;
`;

const ImageRow = styled(Box)`
  > :not(:last-child) {
    margin-right: 24px;
  }
`;

const ImageColumn = styled(Column)`
  > :not(:last-child) {
    margin-bottom: 32px;
  }
`;

const TextContainer = styled(Column)`
  width: 33%;
  margin-left: 32px;
  align-items: flex-start;
  justify-content: flex-start;
`;

const PaddedColumn = styled(Column)`
  margin-bottom: 128px;
`;

const AbsolutePosLogo = styled(Column)`
  position: absolute;
  top: 36px;
  width: 150%;
  > svg {
    width: 80%;
    height: 100%;
  }
`;
