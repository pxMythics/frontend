import { Typography } from '@mui/material';
import background from 'assets/img/hero-background.png';
import thor from 'assets/img/thor.gif';
import { Box } from 'components/base/box';
import { Column } from 'components/base/column';
import { ContainerWithShadow } from 'components/base/container-with-shadow';
import { MintButton } from 'components/mint/mint-button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { ReactComponent as Logo } from 'assets/img/logo.svg';

export const HeroSection: React.FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <ContainerWithShadow>
        <ImageContainer>
          <img src={thor} alt={t('hero.thorAlt')} />
        </ImageContainer>
      </ContainerWithShadow>
      <CenteredColumn>
        <StyledTypography variant={'h2'}>{t('hero.title')}</StyledTypography>
        <FullWidthLogo>
          <Logo />
        </FullWidthLogo>
        <Typography variant={'h3'}>{t('hero.subtitle')}</Typography>
      </CenteredColumn>
      <ContainerWithShadow>
        <MintButton size={'long'} />
      </ContainerWithShadow>
    </Container>
  );
};

const Container = styled(Column)`
  padding-top: 120px;
  height: 870px;
  background: url(${background});
  background-size: cover;
  align-items: center;
`;

const ImageContainer = styled(Box)`
  width: 290px;
  height: 290px;
  border: 3px solid
    ${(props): FlattenSimpleInterpolation | null => css`
      ${props.theme.palette.primaryGradientFinish.main}
    `};
  border-radius: 25px;
  overflow: hidden;
`;

const CenteredColumn = styled(Column)`
  align-items: center;
  padding-bottom: 40px;
`;

const FullWidthLogo = styled(Box)`
  width: 100%;
  justify-content: center;
  position: absolute;
  top: 24px;
  > svg {
    width: 80%;
    height: 100%;
  }
`;

const StyledTypography = styled(Typography)`
  padding-bottom: 88px;
  color: ${(props): FlattenSimpleInterpolation | null => css`
    ${props.theme.palette.primary.main}
  `};
`;
