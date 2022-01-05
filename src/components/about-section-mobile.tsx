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
import { toPairs } from 'ramda';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export const AboutSectionMobile: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const imageFirstRow = {
    shiva: shiva,
    kaishen: kaishen,

    raijin: raijin,
  };
  const imageSecondRow = {
    chaac: chaac,
    anubis: anubis,
    odin: odin,
  };
  return (
    <Container>
      <Typography variant={'h2'}>{t('about.title')}</Typography>
      <AbsolutePosLogo>
        <Logo />
      </AbsolutePosLogo>
      <TextContainer>
        <Typography variant={'body1'}>{t('about.text1')}</Typography>
        <br />
        <Typography variant={'body1'}>{t('about.text2')}</Typography>
        <br />
        <Typography variant={'body1'}>{t('about.text3')}</Typography>
        <br />
        <Typography variant={'body1'}>{t('about.text4')}</Typography>
      </TextContainer>
      <ImageColumn>
        <ImageRow>
          {toPairs(imageFirstRow).map((value) => (
            <ImageContainer key={value[0]}>
              <img src={value[1]} alt={t(`about.${value[0]}`)} />
            </ImageContainer>
          ))}
        </ImageRow>
        <ImageRow>
          {toPairs(imageSecondRow).map((value) => (
            <ImageContainer key={value[0]}>
              <img src={value[1]} alt={t(`about.${value[0]}`)} />
            </ImageContainer>
          ))}
        </ImageRow>
      </ImageColumn>
    </Container>
  );
};

const Container = styled(Column)`
  padding-top: 64px;
  padding-bottom: 32px;
  background: ${(props): FlattenSimpleInterpolation | null => css`
    radial-gradient(51.41% 51.41% at 31.9% 48.59%, ${props.theme.palette.primaryGradientFinish.main} 0%, #101924 99.83%);
    `};
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled(Column)`
  padding: 88px 48px 48px;
`;

const ImageContainer = styled(Box)`
  width: 144px;
  height: 144px;
  border: 1px solid white;
  filter: drop-shadow(0px 10px 8px rgba(0, 0, 0, 0.15));
  border-radius: 10px;
  overflow: hidden;
`;

const ImageRow = styled(Box)`
  > :not(:last-child) {
    margin-right: 32px;
  }
`;

const ImageColumn = styled(Column)`
  > :not(:last-child) {
    margin-bottom: 32px;
  }
`;

const AbsolutePosLogo = styled(Column)`
  position: absolute;
  top: 88px;
  width: 50%;
  > svg {
    width: 100%;
    height: 100%;
  }
`;
