import animationData from 'assets/animations/claim/desktop/animation_6.json';
import { useTimeout } from 'beautiful-react-hooks';
import { ButtonContainer } from 'components/claim/button-container';
import { ClaimStepProps } from 'components/claim/claim-step-props';
import { ContinueButton } from 'components/claim/continue-button';
import React, { useState } from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';

export const ClaimStep6: React.FunctionComponent<ClaimStepProps> = ({ onContinue }) => {
  const [buttonVisible, setButtonVisible] = useState(true);
  useTimeout(() => setButtonVisible(false), 4800);

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
            callback: () => onContinue?.(),
          },
        ]}
      />
      <ButtonContainer>
        <StyledContinueButton visible={buttonVisible} />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const StyledContinueButton = styled(ContinueButton)`
  transform: translateY(553px);
  transition: opacity linear 0s;
`;
