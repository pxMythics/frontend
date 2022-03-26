import desktopBgSrc from 'assets/img/claim/bg-desktop.png';
import mobileBgSrc from 'assets/img/claim/bg-mobile.png';
import { useTimeout } from 'beautiful-react-hooks';
import { Box } from 'components/base/box';
import { Column } from 'components/base/column';
import { ClaimButton } from 'components/claim/claim-button';
import { CloseButton } from 'components/claim/close-button';
import { useOnDesktop } from 'hooks/use-on-desktop';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export const Claim: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const isDesktop = useOnDesktop();
  const availableTokens = 200; // TODO
  const [containerVisible, setContainerVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [tokenBoxVisible, setTokenBoxVisible] = useState(false);
  const [tokenTextVisible, setTokenTextVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [claimButtonVisible, setClaimButtonVisible] = useState(false);
  useTimeout(() => {
    setContainerVisible(true);
    setTitleVisible(true);
  }, 200);
  useTimeout(() => {
    setTokenBoxVisible(true);
  }, 800);
  useTimeout(() => {
    setTokenTextVisible(true);
    setSubtitleVisible(true);
  }, 1200);
  useTimeout(() => {
    setClaimButtonVisible(true);
  }, 2400);

  const onClaim = (): void => {
    // TODO
  };

  return (
    <Container bgSrc={isDesktop ? desktopBgSrc : mobileBgSrc} visible={containerVisible}>
      <StyledCloseButton visible={titleVisible} />
      <Column>
        <Title visible={titleVisible}>{t('claim.title')}</Title>
        <TokenBox visible={tokenBoxVisible}>
          <TokenText visible={tokenTextVisible}>
            {t('claim.tokens', { count: availableTokens })}
          </TokenText>
        </TokenBox>
        <Subtitle visible={subtitleVisible}>{t('claim.subtitle')}</Subtitle>
        <StyledClaimButton visible={claimButtonVisible} onClaim={onClaim} />
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
