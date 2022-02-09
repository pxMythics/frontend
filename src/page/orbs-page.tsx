import { Alert, Button } from '@mui/material';
import { useCall, useContractFunction, useEthers } from '@usedapp/core';
import sol from 'assets/img/orbs/morb01_sol.gif';
import luna from 'assets/img/orbs/morb02_luna.gif';
import gaia from 'assets/img/orbs/morb03_gaia.gif';
import mercury from 'assets/img/orbs/morb04_mercury.gif';
import venus from 'assets/img/orbs/morb05_venus.gif';
import mars from 'assets/img/orbs/morb06_mars.gif';
import jupiter from 'assets/img/orbs/morb07_jupiter.gif';
import saturn from 'assets/img/orbs/morb08_saturn.gif';
import uranus from 'assets/img/orbs/morb09_uranus.gif';
import neptune from 'assets/img/orbs/morb10_neptune.gif';
import { Box } from 'components/base/box';
import { Column } from 'components/base/column';
import { ContainerWithShadow } from 'components/base/container-with-shadow';
import { ImageSlide, ImageSlideProps } from 'components/image-slide';
import { mintPrice, whiteListMintGasPrice } from 'constant';
import { ethers } from 'ethers';
import { useOrbContract } from 'hooks/use-contract';
import { TFunction } from 'i18next';
import { MintResponse } from 'model/api/mint-response';
import { useHttpClient } from 'provider/http-client-provider';
import { useLogger } from 'provider/logger-provider';
import { isNil } from 'ramda';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-spring-3d-carousel-2';
import { useRecoilState } from 'recoil';
import { isOnValidChainState } from 'service/state';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

const getButtonLabel = (claimState: ClaimState, t: TFunction): string => {
  switch (claimState) {
    case ClaimState.CHECKING:
    case ClaimState.FETCHING_PROOF:
      return t('orbs.claim.button.checking');
    case ClaimState.NONE:
      return t('orbs.claim.button.claim');
    case ClaimState.CLAIMING:
    case ClaimState.MINT_ERROR:
      return t('orbs.claim.button.claiming');
    case ClaimState.CLAIMED:
      return t('orbs.claim.button.alreadyClaimed');
    case ClaimState.CANNOT_CLAIM:
      return t('orbs.claim.button.cannotClaim');
    case ClaimState.SUCCESS:
      return t('orbs.claim.button.success');
  }
};

const enum ClaimState {
  NONE,
  CHECKING,
  FETCHING_PROOF,
  CLAIMING,
  CLAIMED,
  CANNOT_CLAIM,
  SUCCESS,
  MINT_ERROR,
}

export const OrbsPage: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const contract = useOrbContract();
  const { state: mintState, send: sendMint } = useContractFunction(contract, 'mintWhitelist');
  const [connected, setConnected] = useState<boolean>(false);
  const [claimState, setClaimState] = useState<ClaimState>(ClaimState.NONE);
  const [connectionError, setConnectionError] = useState<string>();
  const [txError, setTxError] = useState<boolean>(false);
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const [isOnValidChain] = useRecoilState(isOnValidChainState);
  const [mintResponse, setMintResponse] = useState<MintResponse>();
  const logger = useLogger();
  const httpClient = useHttpClient();
  const { value: claimedCount, error: claimedError } =
    useCall(
      account &&
        contract && {
          contract,
          method: 'addressToMintCount',
          args: [account],
        },
    ) ?? {};

  const fetchMintAccess = useCallback((): void => {
    httpClient
      .post<MintResponse>('mint', { address: account })
      .then((res) => {
        if (res.data && res.data?.mint) {
          logger.info(`got mint access: ${JSON.stringify(res.data)}`);
          setMintResponse(res.data);
        } else {
          logger.error(`error parsing mint access: ${JSON.stringify(res.data)}`);
          setClaimState(ClaimState.CANNOT_CLAIM);
        }
      })
      .catch((error) => {
        logger.error(`error fetching mint access: ${error.message}`);
        setClaimState(ClaimState.CANNOT_CLAIM);
      });
  }, [httpClient, account, logger]);

  const imgSlides = useMemo(
    (): ImageSlideProps[] => [
      {
        src: sol,
        alt: 'sol',
      },
      {
        src: luna,
        alt: 'luna',
      },
      {
        src: gaia,
        alt: 'gaia',
      },
      {
        src: mercury,
        alt: 'mercury',
      },
      {
        src: venus,
        alt: 'venus',
      },
      {
        src: mars,
        alt: 'mars',
      },
      {
        src: jupiter,
        alt: 'jupiter',
      },
      {
        src: saturn,
        alt: 'saturn',
      },
      {
        src: uranus,
        alt: 'uranus',
      },
      {
        src: neptune,
        alt: 'neptune',
      },
    ],
    [],
  );

  const slides = useMemo(
    () =>
      imgSlides.map((imgSlide) => ({
        key: imgSlide.alt,
        content: <ImageSlide src={imgSlide.src} alt={imgSlide.alt} />,
      })),
    [imgSlides],
  );

  const onClaimOrb = useCallback(() => {
    if (!connected) {
      setConnected(true);
      activateBrowserWallet();
    }
  }, [connected, setConnected, activateBrowserWallet]);

  // after connection
  useEffect((): void => {
    if (!isNil(account)) {
      if (!connected) {
        deactivate();
      } else if (isOnValidChain && claimState === ClaimState.NONE) {
        setClaimState(ClaimState.CHECKING);
      }
    } else if (!connected && !isOnValidChain) {
      deactivate();
      setConnected(false);
    }
  }, [account, connected, isOnValidChain, claimState]);

  useEffect(() => {
    console.log(`state ${claimState}`);
    if (claimState === ClaimState.CHECKING) {
      if (!isNil(claimedCount)) {
        logger.info(`Claimed ${claimedCount[0]} orbs so far`);
        if (claimedCount[0] > 0) {
          setClaimState(ClaimState.CLAIMED);
        } else {
          setClaimState(ClaimState.FETCHING_PROOF);
        }
      }
    } else if (claimState === ClaimState.FETCHING_PROOF && isNil(mintResponse)) {
      fetchMintAccess();
    } else if (claimState === ClaimState.CLAIMING) {
      const mintCount = mintResponse!.nonce!;
      sendMint(
        mintCount,
        mintResponse!.proof!.map((value) => `0x${value}`),
        {
          gasLimit: ethers.utils.hexlify(157660 * mintCount),
        },
      );
    }
  }, [claimedCount, claimState, mintResponse]);

  // setting tx error if we have a minting error
  useEffect((): void => {
    if (mintState?.status === 'Fail' || mintState?.status === 'Exception') {
      logger.error(`Error minting: ${mintState?.errorMessage}`);
      setTxError(true);
      setClaimState(ClaimState.MINT_ERROR);
    }
    if (mintState?.status === 'Success') {
      setClaimState(ClaimState.SUCCESS);
    }
  }, [mintState, mintState?.status, setClaimState, setTxError]);

  // minting when we received the proof
  useEffect(() => {
    if (!isNil(mintResponse) && claimState === ClaimState.FETCHING_PROOF) {
      setClaimState(ClaimState.CLAIMING);
    }
  }, [mintResponse, claimState, setClaimState]);

  // on checking claimed error
  useEffect((): void => {
    if (!isNil(claimedError)) {
      logger.info(`Error checking claimed state`);
      setClaimState(ClaimState.MINT_ERROR);
    }
  }, [claimedError, setClaimState]);

  return (
    <>
      <Container>
        <CarouselContainer>
          <Carousel showNavigation={false} slides={slides} autoPlay interval={3} offsetRadius={1} />
        </CarouselContainer>
        <ContainerWithShadow shadowDistance={4} shadowWidth={240}>
          <ClaimButton onClick={onClaimOrb} disabled={claimState !== ClaimState.NONE}>
            {getButtonLabel(claimState, t)}
          </ClaimButton>
        </ContainerWithShadow>
      </Container>
      {connectionError && (
        <StyledAlert
          variant="filled"
          severity="error"
          onClose={() => setConnectionError(undefined)}
        >
          {connectionError}
        </StyledAlert>
      )}
      {txError && (
        <StyledAlert variant="filled" severity="error" onClose={() => setTxError(false)}>
          {t('orbs.claim.error')}
        </StyledAlert>
      )}
    </>
  );
};

const Container = styled(Column)`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  background: radial-gradient(50% 50% at 50% 50%, #2362c0 0%, #101924 100%);
  padding: 24px;
`;

const CarouselContainer = styled(Box)`
  width: 100%;
  height: 242px;
  ${(props): string => props.theme.mediaQueries.desktop} {
    width: 800px;
    height: 360px;
  }
`;

const ClaimButton = styled(Button)`
  && {
    margin-top: 64px;
    background: ${(props): FlattenSimpleInterpolation | null => css`
      linear-gradient(180deg,
        ${props.theme.palette.primaryGradientStart.main} 49.38%,
        ${props.theme.palette.primaryGradientFinish.main} 100%,
      ${props.theme.palette.primaryGradientFinish.main} 100%,
      ${props.theme.palette.primaryGradientFinish.main} 100%);
    `};
    border-radius: 12px;
    border: 2px solid #ffffff;
    color: #fff;
    font-weight: bold;
    font-size: 12px;
    height: 40px;
    ${(props): string => props.theme.mediaQueries.desktop} {
      margin-top: 128px;
    }
    :focus {
      outline: none;
    }
  }
  &&&.Mui-disabled {
      color: #fff;
      opacity: 0.3;
    }
  }
`;

const StyledAlert = styled(Alert)`
  && {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-radius: 0;
  }
`;
