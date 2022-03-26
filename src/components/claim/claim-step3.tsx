import animationData from 'assets/animations/claim/desktop/animation_3.json';
import { ButtonContainer } from 'components/claim/button-container';
import { ClaimStepProps } from 'components/claim/claim-step-props';
import { ContinueButton } from 'components/claim/continue-button';
import { isNil } from 'ramda';
import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';

export const ClaimStep3: React.FunctionComponent<ClaimStepProps> = ({ onContinue }) => {
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect((): VoidFunction => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    if (buttonVisible) {
      timeout = setTimeout(() => onContinue?.(), 1100);
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
            callback: () => setButtonVisible(true),
          },
        ]}
      />
      <ButtonContainer>
        <StyledContinueButton visible={buttonVisible} onContinue={onContinue} />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const StyledContinueButton = styled(ContinueButton)`
  transform: translateY(553px);
`;
