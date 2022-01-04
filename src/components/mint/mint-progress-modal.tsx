import { CircularProgress, Typography } from '@mui/material';
import checkmark from 'assets/img/check_circle.png';
import cancel from 'assets/img/cancel.png';
import mintingGif from 'assets/img/minting.gif';
import mintingDoneGif from 'assets/img/minting-done.gif';
import { Box } from 'components/base/box';
import { Column } from 'components/base/column';
import { isNil } from 'ramda';
import React, { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

interface Props {
  isMinting: boolean;
  hasFailed: boolean;
  onTransactionDone?: VoidFunction;
}

export const MintProgressModal: React.FunctionComponent<Props> = ({
  isMinting,
  hasFailed,
  onTransactionDone,
}) => {
  const { t } = useTranslation();
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!isMinting) {
      timeout.current = setTimeout(() => onTransactionDone?.(), 3000);
    }
    return () => {
      if (!isNil(timeout.current)) {
        clearTimeout(timeout.current);
      }
    };
  }, [isMinting, onTransactionDone]);

  const getModalText = useCallback(() => {
    if (isMinting && !hasFailed) {
      return (
        <>
          <PaddedTypography variant={'body2'}>{t('mintModal.mintingText')}</PaddedTypography>
          <Typography variant={'subtitle1'}>{t('mintModal.mintingSubtext')}</Typography>
        </>
      );
    }
    if (hasFailed) {
      return (
        <>
          <PaddedTypography variant={'body2'}>{t('mintModal.failText')}</PaddedTypography>
          <Typography variant={'body2'}>{t('mintModal.failSubtext')}</Typography>
        </>
      );
    } else {
      return <PaddedTypography variant={'body2'}>{t('mintModal.mintingText')}</PaddedTypography>;
    }
  }, [isMinting, hasFailed]);

  const getIcon = useCallback(() => {
    if (isMinting && !hasFailed) {
      return <WhiteCircularProgress />;
    }
    if (hasFailed) {
      return <img alt={t('mintModal.altCheckmark')} src={cancel} />;
    } else {
      return <img alt={t('mintModal.altCheckmark')} src={checkmark} />;
    }
  }, [isMinting, hasFailed]);

  return (
    <Container>
      <ImageContainer>
        <StyledImg
          src={isMinting ? mintingGif : mintingDoneGif}
          alt={t(!isMinting && !hasFailed ? 'mintModal.altGifSuccess' : 'mintModal.altGif')}
        />
      </ImageContainer>
      <PaddedColumn>{getModalText()}</PaddedColumn>
      <PaddedBox>{getIcon()}</PaddedBox>
    </Container>
  );
};

const Container = styled(Column)`
  align-items: center;
  width: 396px;
  border: 3px solid
    ${(props): FlattenSimpleInterpolation | null => css`
      ${props.theme.palette.info.main}
    `};
  border-radius: 20px;
  background: ${(props): FlattenSimpleInterpolation | null => css`
    ${props.theme.palette.primaryGradientStart.main}
  `};
`;

const ImageContainer = styled(Box)`
  height: 300px;
  width: 300px;
  border: 2px solid white;
  box-sizing: border-box;
  border-radius: 20px;
  margin: 48px;
  overflow: hidden;
`;

const StyledImg = styled.img`
  max-height: 100%;
  max-width: 100%;
`;

const PaddedColumn = styled(Column)`
  text-align: center;
  padding: 0 24px;
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
