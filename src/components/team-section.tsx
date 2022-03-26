import { Typography } from '@mui/material';
import useComponentSize from '@rehooks/component-size';
import renaissance from 'assets/img/0xRen.jpeg';
import vitruavian from 'assets/img/0xVitruvian.jpg';
import matt from 'assets/img/anubis.jpeg';
import bill from 'assets/img/bill.png';
import gabey from 'assets/img/gabey.png';
import johnny from 'assets/img/johnny.jpeg';
import kaz from 'assets/img/kas.png';
import kenzit from 'assets/img/kenzit.png';
import nicolle from 'assets/img/nicolle.png';
import snotty from 'assets/img/snotty.png';
import { Box } from 'components/base/box';
import { Column } from 'components/base/column';
import { Section } from 'constant';
import { useOnDesktop } from 'hooks/use-on-desktop';
import { useLogger } from 'provider/logger-provider';
import { isNil } from 'ramda';
import React, { Ref, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

interface TeamMember {
  name: string;
  title: string;
  imgSrc: string;
}

export const TeamSection: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const isDesktop = useOnDesktop();
  const logger = useLogger();
  const team: TeamMember[] = [
    {
      name: t('team.vitruvian.name'),
      title: t('team.vitruvian.title'),
      imgSrc: vitruavian,
    },
    {
      name: t('team.snotty.name'),
      title: t('team.snotty.title'),
      imgSrc: snotty,
    },
    {
      name: t('team.gabey.name'),
      title: t('team.gabey.title'),
      imgSrc: gabey,
    },
    {
      name: t('team.johnny.name'),
      title: t('team.johnny.title'),
      imgSrc: johnny,
    },
    {
      name: t('team.matt.name'),
      title: t('team.matt.title'),
      imgSrc: matt,
    },
    {
      name: t('team.kenzit.name'),
      title: t('team.kenzit.title'),
      imgSrc: kenzit,
    },
    {
      name: t('team.nicolle.name'),
      title: t('team.nicolle.title'),
      imgSrc: nicolle,
    },
    {
      name: t('team.bill.name'),
      title: t('team.bill.title'),
      imgSrc: bill,
    },
    {
      name: t('team.kaz.name'),
      title: t('team.kaz.title'),
      imgSrc: kaz,
    },
    {
      name: t('team.renaissance.name'),
      title: t('team.renaissance.title'),
      imgSrc: renaissance,
    },
  ];
  const teamSize = team.length;
  const nameRef = new Array<Ref<HTMLDivElement>>(teamSize);
  const titleRef = new Array<Ref<HTMLDivElement>>(teamSize);
  const nameWidth = new Array<number>(teamSize);
  const titleWidth = new Array<number>(teamSize);
  const titleHeight = new Array<number>(teamSize);

  for (let i = 0; i < team.length; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    nameRef[i] = useRef(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    titleRef[i] = useRef(null);
    // @ts-ignore
    // eslint-disable-next-line react-hooks/rules-of-hooks
    nameWidth[i] = useComponentSize(nameRef[i])?.width ?? 0;
    // @ts-ignore
    // eslint-disable-next-line react-hooks/rules-of-hooks
    titleWidth[i] = useComponentSize(titleRef[i])?.width ?? 0;
    // @ts-ignore
    // eslint-disable-next-line react-hooks/rules-of-hooks
    titleHeight[i] = useComponentSize(titleRef[i])?.height ?? 0;
  }

  const getTransX = (width: number): number => {
    if (width === 0) {
      return 0;
    }
    if (width > 150) {
      return -Math.floor((width - 150) / 2);
    }
    return Math.floor((150 - width) / 2);
  };

  const getTransY = (height: number): number => {
    const lineHeight = isDesktop ? 22 : 18;
    logger.debug(`height ${height}`);
    if (height > lineHeight) {
      return lineHeight;
    }
    return 0;
  };

  return (
    <Container id={Section.TEAM}>
      <CenteredContainer>
        <Title variant={'h2'}>{t('team.title')}</Title>
        <ImageRow>
          {team.map((member, index) => (
            <TeamMemberContainer key={member.name}>
              <TeamMemberImage src={member.imgSrc} alt={member.name} />
              <TeamMemberNameContainer ref={nameRef[index]}>
                <TeamMemberNameHidden variant={'caption'}>{member.name}</TeamMemberNameHidden>
                <TeamMemberName variant={'caption'} transX={getTransX(nameWidth[index])}>
                  {member.name}
                </TeamMemberName>
              </TeamMemberNameContainer>
              <SubtitleContainer ref={titleRef[index]}>
                <SubtitleHidden>{member.title}</SubtitleHidden>
                <Subtitle
                  transX={getTransX(titleWidth[index])}
                  transY={getTransY(titleHeight[index])}
                >
                  {member.title}
                </Subtitle>
              </SubtitleContainer>
            </TeamMemberContainer>
          ))}
        </ImageRow>
      </CenteredContainer>
    </Container>
  );
};

const Container = styled(Column)`
  width: 100%;
  padding: 64px 0 57px;
  background: ${(props): FlattenSimpleInterpolation | null => css`
    radial-gradient(40.49% 60.02% at 34.85% 50%, ${props.theme.palette.secondaryGradientFinish.main} 0%, ${props.theme.palette.secondaryGradientStart.main} 100%);
    `};
  align-items: center;
  ${(props) => props.theme.mediaQueries.desktop} {
    padding: 93px 0 86px;
  }
`;

const CenteredContainer = styled(Column)`
  width: 100%;
  padding: 0 16px;
  justify-content: center;
  ${(props) => props.theme.mediaQueries.desktop} {
    max-width: 1200px;
  }
`;

const Title = styled(Typography)`
  && {
    margin-bottom: 54px;
    ${(props) => props.theme.mediaQueries.desktop} {
      margin-bottom: 96px;
    }
  }
`;

const TeamMemberContainer = styled.div`
  position: relative;
  padding-bottom: 54px;
  ${(props) => props.theme.mediaQueries.desktop} {
    padding-bottom: 62px;
  }
`;

const TeamMemberImage = styled.img`
  width: 160px;
  height: 160px;
  border: 2px solid ${(props) => props.theme.palette.secondary.main};
  filter: drop-shadow(0px 12px 8px rgba(0, 0, 0, 0.15));
  border-radius: 15px;
  ${(props) => props.theme.mediaQueries.desktop} {
    width: 150px;
    height: 150px;
  }
`;

const TeamMemberNameContainer = styled.div`
  position: absolute;
  top: 170px;
  left: 0;
  ${(props) => props.theme.mediaQueries.desktop} {
    top: 166px;
  }
`;

const TeamMemberNameHidden = styled(Typography)`
  visibility: hidden;
`;

const TeamMemberName = styled(({ transX, ...rest }) => <Typography {...rest} />)<{
  transX: number;
}>`
  && {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(${(props) => props.transX}px);
  }
`;

const SubtitleContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  span {
    font-size: 16px;
    line-height: 16px;
    white-space: pre-line;
    text-align: center;
    ${(props) => props.theme.mediaQueries.desktop} {
      font-weight: 400;
      font-size: 15px;
      line-height: 15px;
    }
  }
`;

const SubtitleHidden = styled.span`
  visibility: hidden;
`;

const Subtitle = styled(({ transX, transY, ...rest }) => <span {...rest} />)<{
  transX: number;
  transY: number;
}>`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(${(props) => props.transX}px, ${(props) => props.transY}px);
`;

const ImageRow = styled(Box)`
  gap: 40px 72px;
  flex-wrap: wrap;
  padding: 0 64px;
  justify-content: center;
`;
