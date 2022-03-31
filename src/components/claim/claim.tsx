import { useCall, useCalls, useContractFunction, useEthers } from '@usedapp/core';
import desktopBgSrc from 'assets/img/claim/bg-desktop.png';
import mobileBgSrc from 'assets/img/claim/bg-mobile.png';
import { useTimeout } from 'beautiful-react-hooks';
import { Box } from 'components/base/box';
import { Column } from 'components/base/column';
import { ClaimButton } from 'components/claim/claim-button';
import { CloseButton } from 'components/claim/close-button';
import { ConnectButton } from 'components/claim/connect-button';
import { BigNumber, ethers } from 'ethers';
import { getRewardForGenesis } from 'helper/claim-helper';
import { useBackendClient } from 'hooks/use-backend-client';
import { useDvnContract, useDvnStakerContract, useGenesisRevealContract } from 'hooks/use-contract';
import { useOnDesktop } from 'hooks/use-on-desktop';
import { useLogger } from 'provider/logger-provider';
import { isEmpty, isNil, reject } from 'ramda';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export const Claim: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const isDesktop = useOnDesktop();
  const backendClient = useBackendClient();
  const genesisRevealContract = useGenesisRevealContract();
  const dvnStakerContract = useDvnStakerContract();
  const dvnContract = useDvnContract();
  const logger = useLogger();
  const { state, send } = useContractFunction(dvnStakerContract, 'claim');
  const { activateBrowserWallet, account, error, library } = useEthers();
  const [containerVisible, setContainerVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [tokenBoxVisible, setTokenBoxVisible] = useState(false);
  const [tokenTextVisible, setTokenTextVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [claimButtonVisible, setClaimButtonVisible] = useState(false);
  const [availableTokens, setAvailableTokens] = useState<BigNumber | null>(null);
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const { value: balance } =
    useCall(
      isNil(dvnContract) || isNil(account)
        ? false
        : { contract: dvnContract, method: 'balanceOf', args: [account] },
    ) ?? {};
  const tokenTraits = useCalls(
    isNil(tokenIds) || isEmpty(tokenIds)
      ? []
      : tokenIds.map((tokenId) => ({
          contract: genesisRevealContract,
          method: 'getMetadataForTokenId',
          args: [tokenId],
        })),
  );
  const tokenLastClaimedAt = useCalls(
    isNil(tokenIds) || isEmpty(tokenIds)
      ? []
      : tokenIds.map((tokenId) => ({
          contract: dvnStakerContract,
          method: 'genesisIdToUpdate',
          args: [tokenId],
        })),
  );
  const getTimestamp = useCallback(() => {
    if (!isNil(library)) {
      library.getBlockNumber().then((blockNumber) => {
        logger.info(`got blockNumber with ${JSON.stringify(blockNumber)}`);
        library.getBlock(blockNumber).then((block) => {
          logger.info(`got block with ${JSON.stringify(block)}`);
          setTimestamp(block.timestamp);
        });
      });
    }
  }, [library]);

  // connect wallet on mount
  // fetch tokenIds when connected
  useEffect((): void => {
    if (isNil(account) && isNil(error)) {
      activateBrowserWallet();
    } else if (isNil(error)) {
      backendClient.post<number[]>('nfts/owned', { address: account }).then((response) => {
        // @ts-ignore
        if (isNil(response.data) || isEmpty(response.data.token_ids)) {
          setTokenTextVisible(true);
        } else {
          // @ts-ignore
          setTokenIds(response.data.token_ids);
        }
      });
    }
  }, [account, activateBrowserWallet, backendClient, error]);

  // get latest block timestamp on mount
  useEffect((): void => {
    getTimestamp();
  }, [library]);

  // get available tokens when traits and last claimed at are fetched
  useEffect((): void => {
    if (!isNil(timestamp) && !isEmpty(tokenTraits) && !isEmpty(tokenLastClaimedAt)) {
      const tokenIdsLength = tokenIds.length;
      const traits = reject(
        isNil,
        tokenTraits.map((result) => result?.value?.[0]?.[0]),
      );
      if (traits.length !== tokenIdsLength) {
        return;
      }
      const claimedAt = reject(
        isNil,
        tokenLastClaimedAt.map((result) => Number.parseInt(result?.value?.[1])),
      );
      if (claimedAt.length !== tokenIdsLength) {
        return;
      }
      logger.info(
        `trying to fetch with traits length ${traits.length} timestamp ${timestamp} and claimedAt ${claimedAt.length}`,
      );
      setAvailableTokens(
        traits
          .map((trait, currentIndex) =>
            getRewardForGenesis(trait, timestamp, claimedAt[currentIndex]),
          )
          .reduce(
            (previousValue, currentValue) => previousValue.add(currentValue),
            BigNumber.from(0),
          ),
      );
      setTokenTextVisible(true);
      setSubtitleVisible(true);
      setClaimButtonVisible(true);
    }
  }, [timestamp, tokenTraits, tokenLastClaimedAt]);

  // reload timestamp on claim
  useEffect((): void => {
    if (state.status === 'Success') {
      getTimestamp();
    }
  }, [getTimestamp, state]);

  useTimeout(() => {
    setContainerVisible(true);
    setTitleVisible(true);
  }, 200);
  useTimeout(() => {
    setTokenBoxVisible(true);
  }, 800);

  const onClaim = (): void => {
    if (isNil(account)) {
      activateBrowserWallet();
    } else {
      send(tokenIds);
    }
  };

  return (
    <Container bgSrc={isDesktop ? desktopBgSrc : mobileBgSrc} visible={containerVisible}>
      <StyledCloseButton visible={titleVisible} />
      <Column>
        <Title visible={titleVisible}>{t('claim.title')}</Title>
        <TokenBox visible={tokenBoxVisible}>
          <TokenText visible={tokenTextVisible}>
            {isNil(tokenIds) || isEmpty(tokenIds) || isNil(availableTokens)
              ? t('claim.nothing')
              : t('claim.tokens', {
                  tokens: Number.parseFloat(ethers.utils.formatEther(availableTokens)).toFixed(2),
                })}
          </TokenText>
        </TokenBox>
        <Subtitle visible={subtitleVisible}>{t('claim.subtitle')}</Subtitle>
        <ClaimedTokenBox visible={tokenBoxVisible}>
          <TokenText visible={tokenBoxVisible}>
            {t('claim.tokens', {
              tokens: isNil(balance)
                ? 0
                : Number.parseFloat(ethers.utils.formatEther(balance[0])).toFixed(2),
            })}
          </TokenText>
        </ClaimedTokenBox>
        <Subtitle visible={tokenBoxVisible}>{t('claim.subtitleBalance')}</Subtitle>
        <StyledClaimButton visible={claimButtonVisible} onClaim={onClaim} />
        {isNil(account) && !isNil(error) && <ConnectButton />}
      </Column>
    </Container>
  );
};

const Container = styled(({ bgSrc, visible, ...rest }) => <Column {...rest} />)<{
  bgSrc: string;
  visible?: boolean;
}>`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-image: ${(props) => `url("${props.bgSrc}")`};
  background-size: contain;
  transition: opacity linear 1500ms;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  ${(props) => props.theme.mediaQueries.desktop} {
    width: 800px;
    height: 800px;
    background-size: 800px 800px;
  }
`;

const Title = styled(({ visible, ...rest }) => <h1 {...rest} />)<{ visible?: boolean }>`
  font-family: Joystix Monospace;
  font-weight: 400;
  font-size: 22px;
  line-height: 135%;
  text-align: center;
  max-width: 240px;
  color: #ffffff;
  margin-bottom: 16px;
  transition: opacity linear 1500ms;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  ${(props) => props.theme.mediaQueries.desktop} {
    font-size: 23px;
    line-height: 120%;
    max-width: unset;
    margin-bottom: 24px;
  }
`;

const TokenBox = styled(({ visible, ...rest }) => <Box {...rest} />)<{ visible?: boolean }>`
  width: 249px;
  background: ${(props) => props.theme.palette.claim.input};
  color: black;
  font-family: Joystix Monospace;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  margin-bottom: 5px;
  padding: 11px;
  border: 1.70548px solid #ffffff;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  ${(props) => props.theme.mediaQueries.desktop} {
    width: 436px;
    border: 3px solid #ffffff;
    padding: 12px 18px;
    font-size: 19px;
    margin-bottom: 10px;
  }
`;

const ClaimedTokenBox = styled(TokenBox)`
  margin-top: 8px;
  ${(props) => props.theme.mediaQueries.desktop} {
    margin-top: 32px;
  }
`;

const TokenText = styled(({ visible, ...rest }) => <span {...rest} />)<{ visible?: boolean }>`
  transition: opacity linear 1s;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

const Subtitle = styled(({ visible, ...rest }) => <p {...rest} />)<{ visible?: boolean }>`
  font-weight: 400;
  font-size: 9px;
  line-height: 133%;
  color: #ffffff;
  margin-bottom: 32px;
  transition: opacity linear 1s;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  ${(props) => props.theme.mediaQueries.desktop} {
    font-size: 14px;
    margin-bottom: 28px;
  }
`;

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  top: 14px;
  right: 14px;
  ${(props) => props.theme.mediaQueries.desktop} {
    top: 10px;
    right: 10px;
  }
`;

const StyledClaimButton = styled(ClaimButton)`
  align-self: center;
`;
