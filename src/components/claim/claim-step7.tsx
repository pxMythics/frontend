import animationData from 'assets/animations/claim/desktop/animation_7.json';
import { ClaimStepProps } from 'components/claim/claim-step-props';
import React from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';

export const ClaimStep7: React.FunctionComponent<ClaimStepProps> = ({ onContinue }) => {
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
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;
