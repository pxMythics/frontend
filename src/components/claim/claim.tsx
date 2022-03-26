import { Box } from 'components/base/box';
import { Column } from 'components/base/column';
import { ClaimButton } from 'components/claim/claim-button';
import { CloseButton } from 'components/claim/close-button';
import { isNil } from 'ramda';
import React, { useEffect, useRef, useState } from 'react';
import desktopBgSrc from 'assets/img/claim/bg-desktop.png';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

export const Claim: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const availableTokens = 200; // TODO
  const containerRef = useRef(null);
  const [containerVisible, setContainerVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [tokenBoxVisible, setTokenBoxVisible] = useState(false);
  const [tokenTextVisible, setTokenTextVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [claimButtonVisible, setClaimButtonVisible] = useState(false);
  const visibilityTimeout1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visibilityTimeout2 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visibilityTimeout3 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onClaim = (): void => {
    // TODO
  };

  // trigger visibility on mount
  useEffect((): void => {
    if (!isNil(containerRef)) {
      setContainerVisible(true);
      setTitleVisible(true);
      visibilityTimeout1.current = setTimeout(() => {
        setTokenBoxVisible(true);
      }, 800);
      visibilityTimeout2.current = setTimeout(() => {
        setTokenTextVisible(true);
        setSubtitleVisible(true);
      }, 1200);
      visibilityTimeout3.current = setTimeout(() => {
        setClaimButtonVisible(true);
      }, 2400);
    }
  }, [containerRef.current]);

  // clear timeout on unmount
  useEffect((): VoidFunction => {
    return (): void => {
      if (!isNil(visibilityTimeout1.current)) {
        clearTimeout(visibilityTimeout1.current);
      }
      if (!isNil(visibilityTimeout2.current)) {
        clearTimeout(visibilityTimeout2.current);
      }
      if (!isNil(visibilityTimeout3.current)) {
        clearTimeout(visibilityTimeout3.current);
      }
    };
  }, []);

  return (
    <Container bgSrc={desktopBgSrc} visible={containerVisible} innerRef={containerRef}>
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
  width: 800px;
  height: 800px;
  align-items: center;
  justify-content: center;
  background-image: ${(props) => `url("${props.bgSrc}")`};
  background-size: 800px 800px;
  transition: opacity linear 1500ms;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

const Title = styled(({ visible, ...rest }) => <h1 {...rest} />)<{ visible?: boolean }>`
  font-family: Joystix Monospace;
  font-weight: 400;
  font-size: 23px;
  line-height: 120%;
  text-align: center;
  color: #ffffff;
  margin-bottom: 24px;
  transition: opacity linear 1500ms;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

const TokenBox = styled(({ visible, ...rest }) => <Box {...rest} />)<{ visible?: boolean }>`
  width: 436px;
  background: ${(props) => props.theme.palette.claim.input};
  border: 3px solid #ffffff;
  color: black;
  padding: 12px 18px;
  font-family: Joystix Monospace;
  font-weight: 400;
  font-size: 19px;
  line-height: 130%;
  margin-bottom: 10px;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;

const TokenText = styled(({ visible, ...rest }) => <span {...rest} />)<{ visible?: boolean }>`
  transition: opacity linear 1s;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

const Subtitle = styled(({ visible, ...rest }) => <p {...rest} />)<{ visible?: boolean }>`
  font-weight: 400;
  font-size: 14px;
  line-height: 133%;
  color: #ffffff;
  margin-bottom: 28px;
  transition: opacity linear 1s;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const StyledClaimButton = styled(ClaimButton)`
  align-self: center;
`;
