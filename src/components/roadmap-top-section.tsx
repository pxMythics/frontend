import { Typography } from '@mui/material';
import topBackground from 'assets/img/roadmap-background-top.png';
import { Column } from 'components/base/column';
import { Section } from 'constant';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import bottomBackground from 'assets/img/roadmap-background-bottom.png';
import elipse from 'assets/img/roadmap-top-elipse.png';
import elipseMobile from 'assets/img/roadmap-top-elipse-mobile.png';
import { useOnMobile } from 'hooks/use-on-mobile';

export const RoadmapTopSection: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const isMobile = useOnMobile();

  return (
    <Column id={Section.ROADMAP}>
      <TopContainer>
        <PaddedTitle variant={'h1'}>{t('roadmap.top.title')}</PaddedTitle>
        <PaddedSubtitle variant={'h4'}>{t('roadmap.top.subtitle')}</PaddedSubtitle>
        {isMobile ? (
          <>
            <StyledTypography variant={'body1'}>{t('roadmap.top.subtextMobile1')}</StyledTypography>
            <StyledTypography variant={'body1'}>{t('roadmap.top.subtextMobile2')}</StyledTypography>
            <StyledTypography variant={'body1'}>{t('roadmap.top.subtextMobile3')}</StyledTypography>
            <StyledTypography variant={'body1'}>{t('roadmap.top.subtextMobile4')}</StyledTypography>
          </>
        ) : (
          <>
            <Typography variant={'body1'}>{t('roadmap.top.subtext1')}</Typography>
            <Typography variant={'body1'}>{t('roadmap.top.subtext2')}</Typography>
          </>
        )}
        {isMobile && (
          <>
            <MobilePosContainer>
              <img src={elipseMobile} alt={t('roadmap.top.elipseAlt')} />
            </MobilePosContainer>
          </>
        )}
      </TopContainer>
      {!isMobile && (
        <>
          <AbsolutePosContainer>
            <img src={elipse} alt={t('roadmap.top.elipseAlt')} />
          </AbsolutePosContainer>
        </>
      )}

      <BottomContainer />
    </Column>
  );
};

const TopContainer = styled(Column)`
  height: 341px;
  background: url(${topBackground});
  background-size: cover;
  padding-top: 69px;
  align-items: center;
  text-align: center;
  background-position: center;
  ${(props) => props.theme.mediaQueries.desktop} {
    background-size: cover;
    padding-top: 124px;
    height: 439px;
  }
`;

const BottomContainer = styled(Column)`
  height: 200px;
  background: url(${bottomBackground});
  background-size: cover;
  background-position: center;
  align-items: center;
  filter: drop-shadow(0px 10px 10px rgba(0, 0, 0, 0.15));
  ${(props) => props.theme.mediaQueries.desktop} {
    height: 488px;
  }
`;

const PaddedTitle = styled(Typography)`
  && {
    margin-bottom: 30px;
    ${(props) => props.theme.mediaQueries.desktop} {
      margin-bottom: 4px;
    }
  }
`;

const PaddedSubtitle = styled(Typography)`
  && {
    margin-bottom: 9px;
    ${(props) => props.theme.mediaQueries.desktop} {
      margin-bottom: 16px;
    }
  }
`;

const AbsolutePosContainer = styled(Column)`
  position: absolute;
  top: 43%;
  left: 47%;
  z-index: 100;
`;

const MobilePosContainer = styled(Column)`
  position: relative;
  margin-top: 18px;
  z-index: 100;
`;

const StyledTypography = styled(Typography)`
  font-size: 16px;
  line-height: 19px;
  font-weight: 500;
`;
