import { Typography } from '@mui/material';
import topBackground from 'assets/img/roadmap-background-top.png';
import { Column } from 'components/base/column';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import bottomBackground from 'assets/img/roadmap-background-bottom.png';
import elipse from 'assets/img/roadmap-elipse.png';

export const RoadmapTopSection: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Column>
      <TopContainer>
        <PaddedTitle variant={'h1'}>{t('roadmap.title')}</PaddedTitle>
        <PaddedSubtitle variant={'h4'}>{t('roadmap.subtitle')}</PaddedSubtitle>
        <Typography variant={'body1'}>{t('roadmap.subtext1')}</Typography>
        <Typography variant={'body1'}>{t('roadmap.subtext2')}</Typography>
      </TopContainer>
      <AbsolutePosContainer>
        <img src={elipse} alt={t('roadmap.elipseAlt')} />
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
  padding-top: 120px;
  height: 488px;
  background: url(${bottomBackground});
  background-size: cover;
  align-items: center;
`;

const PaddedTitle = styled(Typography)`
  margin-bottom: 4px;
`;

const PaddedSubtitle = styled(Typography)`
  margin-bottom: 16px;
`;

const AbsolutePosContainer = styled(Column)`
  position: absolute;
  top: 43%;
  left: 47%;
  z-index: 100;
`;
