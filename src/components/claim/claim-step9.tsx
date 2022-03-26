import animationData from 'assets/animations/claim/desktop/animation_9.json';
import { ButtonContainer } from 'components/claim/button-container';
import { ClaimButton } from 'components/claim/claim-button';
import { ClaimStepProps } from 'components/claim/claim-step-props';
import { isNil } from 'ramda';
import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';

export const ClaimStep9: React.FunctionComponent<ClaimStepProps> = ({ onContinue }) => {
  const [buttonVisible, setButtonVisible] = useState(true);

  useEffect((): VoidFunction => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    if (!buttonVisible) {
      timeout = setTimeout(() => onContinue?.(), 320);
    }
    return (): void => {
      if (!isNil(timeout)) {
        clearTimeout(timeout);
      }
    };
  }, [buttonVisible]);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Container>
      <Lottie
        options={defaultOptions}
        eventListeners={[
          {
            eventName: 'complete',
            callback: () => setButtonVisible(false),
          },
        ]}
      />
      <ButtonContainer>
        <StyledClaimButton visible={buttonVisible} />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const StyledClaimButton = styled(ClaimButton)`
  transform: translateY(553px);
`;
