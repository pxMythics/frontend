import { Typography } from '@mui/material';
import { Box } from 'components/base/box';
import { Column } from 'components/base/column';
import { Section } from 'constant';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import vitruavian from 'assets/img/0xVitruvian.jpg';
import ren from 'assets/img/0xRen.jpeg';
import snotty from 'assets/img/snotty.png';
import gabey from 'assets/img/gabey.png';
import johnny from 'assets/img/johnny.jpeg';
import matt from 'assets/img/anubis.jpeg';
import kenzit from 'assets/img/kenzit.png';
import nicolle from 'assets/img/nicolle.png';
import bill from 'assets/img/bill.png';
import kaz from 'assets/img/kas.png';
import { toPairs } from 'ramda';

export const TeamSection: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const teamFirstRow = {
    vitruvian: vitruavian,
    snotty: snotty,
    gabey: gabey,
    johnny: johnny,
    matt: matt,
  };
  const teamSecondRow = {
    kenzit: kenzit,
    nicolle: nicolle,
    bill: bill,
    kaz: kaz,
    renaissance: ren,
  };
  return (
    <Container id={Section.TEAM}>
      <PaddedTitle variant={'h2'}>{t('team.title')}</PaddedTitle>
      <ImageColumn>
        <ImageRow>
          {toPairs(teamFirstRow).map((value) => (
            <ImageContainer key={value[0]}>
              <BorderedImage>
                <img src={value[1]} alt={t(`team.${value[0]}.name`)} />
              </BorderedImage>
              <PaddedTeamTitle variant={'caption'}>{t(`team.${value[0]}.name`)}</PaddedTeamTitle>
              <Subtitle>{t(`team.${value[0]}.title`)}</Subtitle>
            </ImageContainer>
          ))}
        </ImageRow>
        <ImageRow>
          {toPairs(teamSecondRow).map((value) => (
            <ImageContainer key={value[0]}>
              <BorderedImage>
                <img src={value[1]} alt={t(`team.${value[0]}.name`)} />
              </BorderedImage>
              <PaddedTeamTitle variant={'caption'}>{t(`team.${value[0]}.name`)}</PaddedTeamTitle>
              <Subtitle>{t(`team.${value[0]}.title`)}</Subtitle>
            </ImageContainer>
          ))}
        </ImageRow>
      </ImageColumn>
    </Container>
  );
};

const Container = styled(Column)`
  width: 100%;
  height: 850px;
  padding: 96px 0;
  background: ${(props): FlattenSimpleInterpolation | null => css`
    radial-gradient(40.49% 60.02% at 34.85% 50%, ${props.theme.palette.secondaryGradientFinish.main} 0%, ${props.theme.palette.secondaryGradientStart.main} 100%);
    `};
  align-items: center;
  justify-content: center;
`;

const PaddedTitle = styled(Typography)`
  && {
    margin-bottom: 96px;
  }
`;

const ImageContainer = styled(Column)`
  align-items: center;
  text-align: center;
  width: 215px;
`;

const BorderedImage = styled(Column)`
  width: 150px;
  height: 150px;
  border: 2px solid ${(props) => props.theme.palette.secondary.main};
  filter: drop-shadow(0px 12px 8px rgba(0, 0, 0, 0.15));
  border-radius: 15px;
  margin-bottom: 16px;
  overflow: hidden;
`;

const PaddedTeamTitle = styled(Typography)`
  margin-bottom: 8px;
`;

const Subtitle = styled.span`
  font-size: 15px;
  line-height: 18px;
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
