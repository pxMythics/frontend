import { CircularProgress, Typography } from '@mui/material';
import checkmark from 'assets/img/check_circle.png';
import loadingGif from 'assets/img/mint-gif.gif';
import { Box } from 'components/base/box';
import { Column } from 'components/base/column';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

interface Props {
  isMinting: boolean;
}

export const MintProgressModal: React.FunctionComponent<Props> = ({ isMinting }) => {
  const { t } = useTranslation();
  return (
    <Container>
      <ImageContainer>
        <img src={loadingGif} alt={t('mintModal.altGif')} />
      </ImageContainer>
      {isMinting ? (
        <PaddedTypography variant={'body2'}>{t('mintModal.mintingText')}</PaddedTypography>
      ) : (
        <Typography variant={'body2'}>{t('mintModal.approvedText')}</Typography>
      )}
      {isMinting && <Typography variant={'subtitle1'}>{t('mintModal.mintingSubtext')}</Typography>}
      <PaddedBox>
        {isMinting ? (
          <WhiteCircularProgress />
        ) : (
          <img alt={t('mintModal.altCheckmark')} src={checkmark} />
        )}
      </PaddedBox>
    </Container>
  );
};

const Container = styled(Column)`
  align-items: center;
  width: 396px;
  border: 3px solid #f8da3e;
  border-radius: 20px;
  background: ${(props): FlattenSimpleInterpolation | null => css`
    ${props.theme.palette.primaryGradientStart.main}
  `};
`;

const ImageContainer = styled(Box)`
  height: 300px;
  width: 300px;
  border: 2px solid #ffffff;
  box-sizing: border-box;
  border-radius: 20px;
  margin: 48px;
`;

const PaddedTypography = styled(Typography)`
  padding-bottom: 10px;
`;

const WhiteCircularProgress = styled(CircularProgress)`
  && {
    color: white;
  }
`;
const PaddedBox = styled(Box)`
  padding-top: 24px;
  padding-bottom: 56px;
`;
