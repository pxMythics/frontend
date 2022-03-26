import animationData from 'assets/animations/claim/desktop/animation_9.json';
import { useTimeout } from 'beautiful-react-hooks';
import { ButtonContainer } from 'components/claim/button-container';
import { ClaimButton } from 'components/claim/claim-button';
import { ClaimStepProps } from 'components/claim/claim-step-props';
import { isNil } from 'ramda';
import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';

export const ClaimStep9: React.FunctionComponent<ClaimStepProps> = ({ onContinue }) => {
  const [buttonVisible, setButtonVisible] = useState(true);
  useTimeout(() => setButtonVisible(false), 1200);

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
            callback: () => onContinue?.(),
          },
        ]}
      />
      <ButtonContainer>
        <StyledClaimButton visible={buttonVisible} />
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
