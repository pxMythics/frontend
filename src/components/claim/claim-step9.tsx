import desktopAnimationData from 'assets/animations/claim/desktop/animation_9.json';
import mobileAnimationData from 'assets/animations/claim/mobile/animation_9.json';
import { useTimeout } from 'beautiful-react-hooks';
import { ButtonContainer } from 'components/claim/button-container';
import { ClaimButton } from 'components/claim/claim-button';
import { ClaimStepProps } from 'components/claim/claim-step-props';
import { StepContainer } from 'components/claim/step-container';
import { useOnDesktop } from 'hooks/use-on-desktop';
import React, { useState } from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';

export const ClaimStep9: React.FunctionComponent<ClaimStepProps> = ({ onContinue }) => {
  const isDesktop = useOnDesktop();
  const [buttonVisible, setButtonVisible] = useState(true);
  useTimeout(() => setButtonVisible(false), 1200);

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
            callback: () => onContinue?.(),
          },
        ]}
      />
      <ButtonContainer>
        <StyledClaimButton visible={buttonVisible} />
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
