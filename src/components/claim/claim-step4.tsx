import animationData from 'assets/animations/claim/desktop/animation_4.json';
import { ClaimStepProps } from 'components/claim/claim-step-props';
import React from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';

export const ClaimStep4: React.FunctionComponent<ClaimStepProps> = ({ onContinue }) => (
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
          callback: () => onContinue?.(),
        },
      ]}
    />
  </Container>
);

const Container = styled.div`
  position: relative;
`;
