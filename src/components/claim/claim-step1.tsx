import desktopAnimationData from 'assets/animations/claim/desktop/animation_1.json';
import mobileAnimationData from 'assets/animations/claim/mobile/animation_1.json';
import { useLocalStorage } from 'beautiful-react-hooks';
import { ClaimStepProps } from 'components/claim/claim-step-props';
import { StepContainer } from 'components/claim/step-container';
import { useOnDesktop } from 'hooks/use-on-desktop';
import React, { useEffect } from 'react';
import Lottie from 'react-lottie';
import { LocalStorageKey } from 'service/local-storage';

export const ClaimStep1: React.FunctionComponent<ClaimStepProps> = ({ onContinue }) => {
  const isDesktop = useOnDesktop();
  const [, setClaimAnimationSeen] = useLocalStorage<boolean>(LocalStorageKey.CLAIM_ANIMATION_SEEN);

  // set the animation as seen in local storage the first time the user sees it
  useEffect((): void => {
    setClaimAnimationSeen(true);
  }, []);

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
    </StepContainer>
  );
};
