import desktopAnimationData from 'assets/animations/claim/desktop/animation_8.json';
import mobileAnimationData from 'assets/animations/claim/mobile/animation_8.json';
import { ButtonContainer } from 'components/claim/button-container';
import { ClaimButton } from 'components/claim/claim-button';
import { ClaimStepProps } from 'components/claim/claim-step-props';
import { StepContainer } from 'components/claim/step-container';
import { useOnDesktop } from 'hooks/use-on-desktop';
import React, { useState } from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';

export const ClaimStep8: React.FunctionComponent<ClaimStepProps> = ({ onContinue }) => {
  const isDesktop = useOnDesktop();
  const [buttonVisible, setButtonVisible] = useState(false);

  return (
    <StepContainer>
      <Lottie
        options={{
          loop: false,
          autoplay: true,
          animationData: isDesktop ? desktopAnimationData : mobileAnimationData,
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
    </StepContainer>
  );
};

const StyledClaimButton = styled(ClaimButton)`
  transform: translateY(438px);
  ${(props) => props.theme.mediaQueries.desktop} {
    transform: translateY(553px);
  }
`;
