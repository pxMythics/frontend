import desktopAnimationData from 'assets/animations/claim/desktop/animation_2.json';
import mobileAnimationData from 'assets/animations/claim/mobile/animation_2.json';
import { useTimeout } from 'beautiful-react-hooks';
import { ButtonContainer } from 'components/claim/button-container';
import { ClaimStepProps } from 'components/claim/claim-step-props';
import { ContinueButton } from 'components/claim/continue-button';
import { StepContainer } from 'components/claim/step-container';
import { useOnDesktop } from 'hooks/use-on-desktop';
import React, { useState } from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';

export const ClaimStep2: React.FunctionComponent<ClaimStepProps> = ({ onContinue }) => {
  const isDesktop = useOnDesktop();
  const [buttonVisible, setButtonVisible] = useState(false);
  useTimeout(() => setButtonVisible(true), 400);

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
      />
      <ButtonContainer>
        <StyledContinueButton visible={buttonVisible} onContinue={onContinue} />
      </ButtonContainer>
    </StepContainer>
  );
};

const StyledContinueButton = styled(ContinueButton)`
  transform: translateY(470px);
  ${(props) => props.theme.mediaQueries.desktop} {
    transform: translateY(600px);
  }
`;
