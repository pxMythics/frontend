import animationData from 'assets/animations/claim/desktop/animation_2.json';
import { useTimeout } from 'beautiful-react-hooks';
import { ButtonContainer } from 'components/claim/button-container';
import { ClaimStepProps } from 'components/claim/claim-step-props';
import { ContinueButton } from 'components/claim/continue-button';
import React, { useState } from 'react';
import Lottie from 'react-lottie';
import styled from 'styled-components';

export const ClaimStep2: React.FunctionComponent<ClaimStepProps> = ({ onContinue }) => {
  const [buttonVisible, setButtonVisible] = useState(false);
  useTimeout(() => setButtonVisible(true), 400);

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
      />
      <ButtonContainer>
        <StyledContinueButton visible={buttonVisible} onContinue={onContinue} />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const StyledContinueButton = styled(ContinueButton)`
  transform: translateY(600px);
`;
