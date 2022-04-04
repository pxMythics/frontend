import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Typography } from '@mui/material';
import timelineIcon from 'assets/img/roadmap-elipse.png';
import { Column } from 'components/base/column';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import phase1Gif from 'assets/img/phase-one.gif';
import phase2Gif from 'assets/img/phase-two.gif';
import phase3Gif from 'assets/img/phase-three.gif';
import phase4Gif from 'assets/img/final-phase.gif';

export const RoadmapBottomSection: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Timeline position="alternate">
        {/*PHASE ONE*/}
        <TimelineItem>
          <Phase1TimelineContent>
            <Column>
              <PhaseTypography>{t('roadmap.bottom.phase1.title')}</PhaseTypography>
              <Typography variant={'subtitle2'}>
                {t('roadmap.bottom.phase1.body1.text1')}
              </Typography>
              <br />
              <StyledList>
                <li>
                  <span>
                    {t('roadmap.bottom.phase1.body1.subtext1.first')}
                    <br />
                    {t('roadmap.bottom.phase1.body1.subtext1.second')}
                  </span>
                </li>
                <li>
                  <span>
                    {t('roadmap.bottom.phase1.body1.subtext2.first')}
                    <br />
                    {t('roadmap.bottom.phase1.body1.subtext2.second')}
                  </span>
                </li>
                <li>
                  <span>
                    {t('roadmap.bottom.phase1.body1.subtext3.first')}
                    <br />
                    {t('roadmap.bottom.phase1.body1.subtext3.second')}
                  </span>
                </li>
              </StyledList>
              <br />
              <Typography variant={'subtitle2'}>{t('roadmap.bottom.phase1.subtitle')}</Typography>
              <br />
              <StyledList>
                <li>{t('roadmap.bottom.phase1.body1.subtext4')}</li>
                <li>{t('roadmap.bottom.phase1.body1.subtext5')}</li>
              </StyledList>
            </Column>
          </Phase1TimelineContent>
          <TimelineSeparator>
            <StyledTimelineDot>
              <img src={timelineIcon} alt={t('roadmap.bottom.phase1.altRoadmap')} />
            </StyledTimelineDot>
            <StyledTimelineConnector />
          </TimelineSeparator>
          <Phase1TimelineOppositeContent>
            <H5Typography>{t('roadmap.bottom.phase1.subtitle')}</H5Typography>
            <PhaseGifContainer>
              <GifContainer />
              <img src={phase1Gif} alt={t('roadmap.bottom.phase1.altGif')} />
            </PhaseGifContainer>
          </Phase1TimelineOppositeContent>
        </TimelineItem>
        {/*PHASE TWO*/}
        <TimelineItem>
          <Phase2TimelineContent>
            <LeftAlignedColumn>
              <PhaseTypography>{t('roadmap.bottom.phase2.title')}</PhaseTypography>
              <Typography variant={'subtitle2'}>{t('roadmap.bottom.phase2.body1_1')}</Typography>
              <br />
              <Typography variant={'subtitle2'}>{t('roadmap.bottom.phase2.body1_2')}</Typography>
              <br />
              <Typography variant={'subtitle2'}>{t('roadmap.bottom.phase2.body1_3')}</Typography>
              <br />
              <Typography variant={'subtitle2'}>{t('roadmap.bottom.phase2.body1_4')}</Typography>
            </LeftAlignedColumn>
          </Phase2TimelineContent>
          <TimelineSeparator>
            <StyledTimelineDot>
              <img src={timelineIcon} alt={t('roadmap.bottom.phase2.altRoadmap')} />
            </StyledTimelineDot>
            <StyledTimelineConnector />
          </TimelineSeparator>
          <Phase2TimelineOppositeContent>
            <H5Typography left>{t('roadmap.bottom.phase2.subtitle')}</H5Typography>
            <PhaseGifContainer left>
              <GifContainer left />
              <img src={phase2Gif} alt={t('roadmap.bottom.phase2.altGif')} />
            </PhaseGifContainer>
          </Phase2TimelineOppositeContent>
        </TimelineItem>
        {/*PHASE THREE*/}
        <TimelineItem>
          <Phase2TimelineContent>
            <LeftAlignedColumn>
              <PhaseTypography>{t('roadmap.bottom.phase3.title')}</PhaseTypography>
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
            </LeftAlignedColumn>
          </Phase2TimelineContent>
          <TimelineSeparator>
            <StyledTimelineDot>
              <img src={timelineIcon} alt={t('roadmap.bottom.phase3.altRoadmap')} />
            </StyledTimelineDot>
            <StyledTimelineConnector />
          </TimelineSeparator>
          <Phase2TimelineOppositeContent>
            <H5Typography>{t('roadmap.bottom.phase3.subtitle')}</H5Typography>
            <PhaseGifContainer>
              <GifContainer />
              <img src={phase3Gif} alt={t('roadmap.bottom.phase3.altGif')} />
            </PhaseGifContainer>
          </Phase2TimelineOppositeContent>
        </TimelineItem>
        <Phase4Container>
          <Phase4GifContainer>
            <GifContainer />
            <img src={phase4Gif} alt={t('roadmap.bottom.phase4.altGif')} />
          </Phase4GifContainer>
        </Phase4Container>
        <TimelineItem>
          <TimelineContent />
          <TimelineSeparator>
            <StyledTimelineDot>
              <img src={timelineIcon} alt={t('roadmap.bottom.phase4.altRoadmap')} />
            </StyledTimelineDot>
          </TimelineSeparator>
          <TimelineOppositeContent />
        </TimelineItem>
      </Timeline>
      <PaddedColumn>
        <Typography variant={'h6'}>{t('roadmap.bottom.phase4.title')}</Typography>
        <PaddedSubtitle2 variant={'subtitle2'}>
          {t('roadmap.bottom.phase4.subtitle')}
        </PaddedSubtitle2>
      </PaddedColumn>
    </Container>
  );
};

const Container = styled(Column)`
  margin: auto;
  width: 80%;
  padding-top: 136px;
  align-items: center;
  border: 3px solid red;
`;

const StyledTimelineDot = styled(TimelineDot)`
  background-color: transparent;
  box-shadow: none;
  padding: 0;
  margin: 0;
`;

const StyledTimelineConnector = styled(TimelineConnector)`
  width: 5px;
  background-color: ${(props): FlattenSimpleInterpolation | null => css`
    ${props.theme.palette.primaryGradientFinish.main};
  `};
`;

const PhaseTypography = styled(({ left, ...renderProps }) => (
  <Typography variant={'h2'} {...renderProps} />
))<{
  left: boolean;
}>`
  background: ${(props): FlattenSimpleInterpolation | null => css`
      linear-gradient(180deg, 
        ${props.theme.palette.secondaryGradientStart.main} 0%, 
        ${props.theme.palette.secondaryGradientFinish.main} 100%);
    `};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 16px;
`;

const StyledList = styled.ul`
  list-style-type: disc;
  list-style-position: inside;
  text-indent: -24px;
  padding-left: 1em;
  margin-left: 16px;
  > li {
    font-size: 16px;
    line-height: 20px;
    color: black;
    font-weight: 600;
  }
`;

const H5Typography = styled(({ left, ...renderProps }) => (
  <Typography variant={'h5'} {...renderProps} />
))<{
  left: boolean;
}>`
 ${(props) => {
   if (props.left) {
     return css`
       text-align: right;
     `;
   } else {
     return css`
       margin-left: 32px;
       text-align: left;
     `;
   }
 }};
}`;

const PhaseGifContainer = styled(({ left, ...renderProps }) => <Column {...renderProps} />)<{
  left: boolean;
}>`
  width: 420px;
  height: 262px;
  margin-top: 32px;
  margin-bottom: 32px;
  ${(props): FlattenSimpleInterpolation | null => {
    if (props.left) {
      return css`
        text-align: right;
        margin-right: -24px;
        margin-left: auto;
      `;
    } else {
      return css`
        margin-left: -24px;
      `;
    }
  }};
`;

const GifContainer = styled(({ left, ...renderProps }) => <Column {...renderProps} />)<{
  left: boolean;
}>`
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 12px;
  background: ${(props): FlattenSimpleInterpolation | null => css`
    ${props.theme.palette.primaryGradientFinish.main}
  `};
  ${(props): FlattenSimpleInterpolation | null => {
    if (props.left) {
      return css`
        left: 8px;
      `;
    } else {
      return css`
        right: 8px;
      `;
    }
  }};
`;

const Phase1TimelineContent = styled(TimelineContent)`
  padding-bottom: 72px;
`;
const Phase1TimelineOppositeContent = styled(TimelineOppositeContent)`
  padding-bottom: 72px;
`;

const Phase2TimelineContent = styled(TimelineContent)`
  margin-top: -32px;
  padding-bottom: 72px;
`;
const Phase2TimelineOppositeContent = styled(TimelineOppositeContent)`
  margin-top: -32px;
  padding-bottom: 72px;
`;

const LeftAlignedColumn = styled(Column)`
  text-align: left;
  margin-left: 32px;
`;

const Phase4Container = styled(Column)`
  align-items: center;
  width: 100%;
`;
const Phase4GifContainer = styled(Column)`
  width: 992px;
  height: 612px;
`;

const PaddedColumn = styled(Column)`
  padding-top: 64px;
  width: 60%;
  margin: auto;
  text-align: center;
`;

const PaddedSubtitle2 = styled(Typography)`
  && {
    padding: 18px 32px;
  }
`;
