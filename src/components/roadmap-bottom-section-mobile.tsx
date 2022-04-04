import { Typography } from '@mui/material';
import { Column } from 'components/base/column';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import phase1Gif from 'assets/img/phase-one.gif';
import phase2Gif from 'assets/img/phase-two.gif';
import phase3Gif from 'assets/img/phase-three.gif';
import phase4Gif from 'assets/img/final-phase.gif';

export const RoadmapBottomSectionMobile: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Container>
      {/*PHASE ONE*/}
      <StyledColumn>
        <TopPhaseTypography>{t('roadmap.bottom.phase1.titleMobileTop')}</TopPhaseTypography>
        <BottomPhaseTypography>
          {t('roadmap.bottom.phase1.titleMobileBottom')}
        </BottomPhaseTypography>
        <H5Typography variant={'h5'}>{t('roadmap.bottom.phase1.subtitle')}</H5Typography>
        <Typography variant={'subtitle2'}>{t('roadmap.bottom.phase1.body1.text1')}</Typography>
        <br />
        <StyledList>
          <li>
            {t('roadmap.bottom.phase1.body1.subtext1.first')}&nbsp;
            {t('roadmap.bottom.phase1.body1.subtext1.second')}
          </li>
          <li>
            {t('roadmap.bottom.phase1.body1.subtext2.first')}&nbsp;
            {t('roadmap.bottom.phase1.body1.subtext2.second')}
          </li>
          <li>
            {t('roadmap.bottom.phase1.body1.subtext3.first')}&nbsp;
            {t('roadmap.bottom.phase1.body1.subtext3.second')}
          </li>
        </StyledList>
        <br />
        <Typography variant={'subtitle2'}>{t('roadmap.bottom.phase1.subtitle')}</Typography>
        <br />
        <StyledList>
          <li>{t('roadmap.bottom.phase1.body1.subtext4')}</li>
          <li>{t('roadmap.bottom.phase1.body1.subtext5')}</li>
        </StyledList>
      </StyledColumn>
      <PhaseGifContainer>
        <img src={phase1Gif} alt={t('roadmap.bottom.phase1.altGif')} />
      </PhaseGifContainer>
      {/*PHASE TWO*/}
      <StyledColumn>
        <TopPhaseTypography>{t('roadmap.bottom.phase2.titleMobileTop')}</TopPhaseTypography>
        <BottomPhaseTypography variant={'h2'}>
          {t('roadmap.bottom.phase2.titleMobileBottom')}
        </BottomPhaseTypography>
        <H5Typography variant={'h5'}>{t('roadmap.bottom.phase2.subtitle')}</H5Typography>
        <Typography variant={'subtitle2'}>{t('roadmap.bottom.phase2.body1_1')}</Typography>
        <br />
        <Typography variant={'subtitle2'}>{t('roadmap.bottom.phase2.body1_2')}</Typography>
        <br />
        <Typography variant={'subtitle2'}>{t('roadmap.bottom.phase2.body1_3')}</Typography>
        <br />
        <Typography variant={'subtitle2'}>{t('roadmap.bottom.phase2.body1_4')}</Typography>
      </StyledColumn>
      <PhaseGifContainer left>
        <img src={phase2Gif} alt={t('roadmap.bottom.phase2.altGif')} />
      </PhaseGifContainer>
      {/*PHASE THREE*/}
      <StyledColumn>
        <TopPhaseTypography>{t('roadmap.bottom.phase3.titleMobileTop')}</TopPhaseTypography>
        <BottomPhaseTypography>
          {t('roadmap.bottom.phase3.titleMobileBottom')}
        </BottomPhaseTypography>
        <H5Typography variant={'h5'}>{t('roadmap.bottom.phase3.subtitle')}</H5Typography>
        <Typography variant={'subtitle2'}>{t('roadmap.bottom.phase3.body.text1')}</Typography>
        <br />
        <Typography variant={'subtitle2'}>{t('roadmap.bottom.phase3.body.text2')}</Typography>
        <br />
        <StyledList>
          <li>{t('roadmap.bottom.phase3.body.subtext1.first')}</li>
          <li>{t('roadmap.bottom.phase3.body.subtext1.second')}</li>
        </StyledList>
        <br />
        <Typography variant={'subtitle2'}>{t('roadmap.bottom.phase3.body.text3')}</Typography>
        <br />
        <StyledList>
          <li>{t('roadmap.bottom.phase3.body.subtext2.first')}</li>
          <li>{t('roadmap.bottom.phase3.body.subtext2.second')}</li>
        </StyledList>
        <br />
      </StyledColumn>
      <PhaseGifContainer>
        <img src={phase3Gif} alt={t('roadmap.bottom.phase3.altGif')} />
      </PhaseGifContainer>
      {/*PHASE FOUR*/}
      <StyledColumn>
        <Phase4HeadingContainer>
          <Typography variant={'h6'}>{t('roadmap.bottom.phase4.titleTop')}</Typography>
          <Typography variant={'h6'}>{t('roadmap.bottom.phase4.titleMiddle')}</Typography>
          <Typography variant={'h6'}>{t('roadmap.bottom.phase4.titleBottom')}</Typography>
        </Phase4HeadingContainer>
        <PaddedSubtitle2 variant={'subtitle2'}>
          {t('roadmap.bottom.phase4.subtitle')}
        </PaddedSubtitle2>
        <Phase4GifContainer>
          <img src={phase4Gif} alt={t('roadmap.bottom.phase4.altGif')} />
        </Phase4GifContainer>
      </StyledColumn>
    </Container>
  );
};

const Container = styled(Column)`
  align-items: center;
`;
const StyledColumn = styled(Column)`
  margin: 0px 24px;
`;

const TopPhaseTypography = styled(({ left, ...renderProps }) => (
  <Typography variant={'h2'} {...renderProps} />
))<{
  left: boolean;
}>`
  padding-top: 66px;
  background: ${(props): FlattenSimpleInterpolation | null => css`
      linear-gradient(180deg, 
        ${props.theme.palette.secondaryGradientStart.main} 0%, 
        ${props.theme.palette.secondaryGradientFinish.main} 100%);
    `};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const BottomPhaseTypography = styled(({ left, ...renderProps }) => (
  <Typography variant={'h2'} {...renderProps} />
))<{
  left: boolean;
}>`
  padding-bottom: 35px;
  background: ${(props): FlattenSimpleInterpolation | null => css`
      linear-gradient(180deg, 
        ${props.theme.palette.secondaryGradientStart.main} 0%, 
        ${props.theme.palette.secondaryGradientFinish.main} 100%);
    `};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const StyledList = styled.ul`
  margin-left: 25px;
  > li {
    position: relative;
    font-size: 16px;
    line-height: 20px;
    color: black;
    font-weight: 700;
    display: inline-block;
    ::before {
      content: '●';
      position: absolute;
      top: -1px;
      left: -17px;
    }
  }
`;

const PhaseGifContainer = styled(({ left, ...renderProps }) => <Column {...renderProps} />)<{
  left: boolean;
}>`
  width: 100%;
  margin-top: 44px;
`;

const Phase4GifContainer = styled(Column)`
  width: 600px;
  height: 370px;
`;

const PaddedSubtitle2 = styled(Typography)`
  && {
    font-family: Roboto;
    font-size: 13px;
    line-height: 20px;
    font-weight: 500;
    padding: 32px 125px;
    text-align: center;
  }
`;

const H5Typography = styled(Typography)`
  && {
    padding-bottom: 40px;
  }
`;

const Phase4HeadingContainer = styled(Column)`
  && {
    align-items: center;
    padding-top: 66px;
  }
`;
