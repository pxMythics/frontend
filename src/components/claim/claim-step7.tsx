import desktopAnimationData from 'assets/animations/claim/desktop/animation_7.json';
import mobileAnimationData from 'assets/animations/claim/mobile/animation_7.json';
import { ClaimStepProps } from 'components/claim/claim-step-props';
import { StepContainer } from 'components/claim/step-container';
import { useOnDesktop } from 'hooks/use-on-desktop';
import React from 'react';
import Lottie from 'react-lottie';

export const ClaimStep7: React.FunctionComponent<ClaimStepProps> = ({ onContinue }) => {
  const isDesktop = useOnDesktop();

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
            callback: () => {
              onContinue?.();
            },
          },
        ]}
      />
    </StepContainer>
  );
};
