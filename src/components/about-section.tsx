import { Typography } from '@mui/material';
import { BaseButton } from 'components/base/base-button';
import anubis from 'assets/img/anubis.jpeg';
import chaac from 'assets/img/chaac.png';
import kaishen from 'assets/img/kaishen.png';
import { ReactComponent as Logo } from 'assets/img/logo.svg';
import odin from 'assets/img/odin.png';
import raijin from 'assets/img/raijin.png';
import shiva from 'assets/img/shiva.png';
import { BaseLink } from 'components/base/base-link';
import { Box } from 'components/base/box';
import { Column } from 'components/base/column';
import { Section } from 'constant';
import { toPairs } from 'ramda';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Routes } from 'service/routing';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

export const AboutSection: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const imageFirstRow = {
    shiva: shiva,
    chaac: chaac,
    raijin: raijin,
  };
  const imageSecondRow = {
    kaishen: kaishen,
    anubis: anubis,
    odin: odin,
  };
  return (
    <Container id={Section.ABOUT}>
      <ImageRow>
        <ImageColumn>
          {toPairs(imageFirstRow).map((value) => (
            <ImageContainer key={value[0]}>
              <img src={value[1]} alt={t(`about.${value[0]}`)} />
            </ImageContainer>
          ))}
        </ImageColumn>
        <ImageColumn>
          {toPairs(imageSecondRow).map((value) => (
            <ImageContainer key={value[0]}>
              <img src={value[1]} alt={t(`about.${value[0]}`)} />
            </ImageContainer>
          ))}
        </ImageColumn>
      </ImageRow>
      <TextContainer>
        <PaddedColumn>
          <Typography variant={'h2'}>{t('about.title')}</Typography>
          <AbsolutePosLogo width={480} height={140} />
        </PaddedColumn>
        <Typography variant={'body1'}>{t('about.text1')}</Typography>
        <br />
        <Typography variant={'body1'}>{t('about.text2')}</Typography>
        <br />
        <Typography variant={'body1'}>{t('about.text3')}</Typography>
        <br />
        <Typography variant={'body1'}>{t('about.text4')}</Typography>
        <BaseLink to={Routes.claim}>
          <ClaimButton>{t('about.claim.button')}</ClaimButton>
        </BaseLink>
      </TextContainer>
    </Container>
  );
};

const Container = styled(Box)`
  padding: 95px 32px 135px;
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
  margin-left: 60px;
`;

const PaddedColumn = styled(Column)`
  margin-bottom: 128px;
`;

const AbsolutePosLogo = styled(Logo)`
  position: absolute;
  top: 40px;
`;

const ClaimButton = styled(BaseButton)`
  && {
    margin-top: 36px;
    color: white;
  }
`;
