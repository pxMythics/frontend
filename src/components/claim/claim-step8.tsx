import animationData from 'assets/animations/claim/desktop/animation_8.json';
import { ButtonContainer } from 'components/claim/button-container';
import { ClaimButton } from 'components/claim/claim-button';
import { ClaimStepProps } from 'components/claim/claim-step-props';
import React, { useState } from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';

export const ClaimStep8: React.FunctionComponent<ClaimStepProps> = ({ onContinue }) => {
  const [buttonVisible, setButtonVisible] = useState(false);

  return (
    <Container>
      <Lottie
        options={{
          loop: false,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        eventListeners={[
          {
            eventName: 'complete',
            callback: () => setButtonVisible(true),
          },
        ]}
      />
      <ButtonContainer>
        <StyledClaimButton visible={buttonVisible} onClaim={onContinue} />
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
