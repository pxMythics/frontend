import animationData from 'assets/animations/claim/desktop/animation_4.json';
import { ButtonContainer } from 'components/claim/button-container';
import { ClaimStepProps } from 'components/claim/claim-step-props';
import { ContinueButton } from 'components/claim/continue-button';
import React from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';

export const ClaimStep4: React.FunctionComponent<ClaimStepProps> = ({ onContinue }) => {
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
            callback: () => {
              onContinue?.();
            },
          },
        ]}
      />
      <ButtonContainer>
        <StyledContinueButton
          visible
          onContinue={() => {
            onContinue?.();
          }}
        />
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
