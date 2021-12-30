import { CircularProgress, Typography } from '@mui/material';
import checkmark from 'assets/img/check_circle.png';
import mintingGif from 'assets/img/minting.gif';
import mintingDoneGif from 'assets/img/minting-done.gif';
import { Box } from 'components/base/box';
import { Column } from 'components/base/column';
import { isNil } from 'ramda';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

interface Props {
  isMinting: boolean;
  onTransactionDone?: VoidFunction;
}

export const MintProgressModal: React.FunctionComponent<Props> = ({
  isMinting,
  onTransactionDone,
}) => {
  const { t } = useTranslation();
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isMinting) {
      timeout.current = setTimeout(() => onTransactionDone?.(), 3000);
    }
    return () => {
      if (!isNil(timeout.current)) {
        clearTimeout(timeout.current);
      }
    };
  }, [isMinting, onTransactionDone]);

  return (
    <Container>
      <ImageContainer>
        <StyledImg src={isMinting ? mintingGif : mintingDoneGif} alt={t('mintModal.altGif')} />
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
  overflow: hidden;
`;

const StyledImg = styled.img`
  max-height: 100%;
  max-width: 100%;
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
