import { Typography } from '@mui/material';
import topBackground from 'assets/img/roadmap-background-top.png';
import { Column } from 'components/base/column';
import { Section } from 'constant';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import bottomBackground from 'assets/img/roadmap-background-bottom.png';
import elipse from 'assets/img/roadmap-top-elipse.png';

export const RoadmapTopSection: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Column id={Section.ROADMAP}>
      <TopContainer>
        <PaddedTitle variant={'h1'}>{t('roadmap.top.title')}</PaddedTitle>
        <PaddedSubtitle variant={'h4'}>{t('roadmap.top.subtitle')}</PaddedSubtitle>
        <Typography variant={'body1'}>{t('roadmap.top.subtext1')}</Typography>
        <Typography variant={'body1'}>{t('roadmap.top.subtext2')}</Typography>
      </TopContainer>
      <AbsolutePosContainer>
        <img src={elipse} alt={t('roadmap.top.elipseAlt')} />
      </AbsolutePosContainer>
      <BottomContainer />
    </Column>
  );
};

const TopContainer = styled(Column)`
  padding-top: 124px;
  height: 439px;
  background: url(${topBackground});
  background-size: cover;
  align-items: center;
  text-align: center;
`;

const BottomContainer = styled(Column)`
  height: 488px;
  background: url(${bottomBackground});
  background-size: cover;
  align-items: center;
  filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.15));
`;

const PaddedTitle = styled(Typography)`
  && {
    margin-bottom: 4px;
  }
`;

const PaddedSubtitle = styled(Typography)`
  && {
    margin-bottom: 16px;
  }
`;

const AbsolutePosContainer = styled(Column)`
  position: absolute;
  top: 43%;
  left: 47%;
  z-index: 100;
`;
