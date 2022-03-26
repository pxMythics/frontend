import { useLocalStorage } from 'beautiful-react-hooks';
import { Column } from 'components/base/column';
import { Claim } from 'components/claim/claim';
import { ClaimStep1 } from 'components/claim/claim-step1';
import { ClaimStep2 } from 'components/claim/claim-step2';
import { ClaimStep3 } from 'components/claim/claim-step3';
import { ClaimStep4 } from 'components/claim/claim-step4';
import { ClaimStep5 } from 'components/claim/claim-step5';
import { ClaimStep6 } from 'components/claim/claim-step6';
import { ClaimStep7 } from 'components/claim/claim-step7';
import { ClaimStep8 } from 'components/claim/claim-step8';
import { ClaimStep9 } from 'components/claim/claim-step9';
import { useLogger } from 'provider/logger-provider';
import React, { useCallback, useState } from 'react';
import { LocalStorageKey } from 'service/local-storage';
import styled from 'styled-components';

export const ClaimPage: React.FunctionComponent = () => {
  const [claimAnimationSeen] = useLocalStorage<boolean>(
    LocalStorageKey.CLAIM_ANIMATION_SEEN,
    false,
  );
  const [step, setStep] = useState(claimAnimationSeen ? 10 : 1);
  const moveToNextStep = useCallback(() => {
    setStep(step + 1);
  }, [step]);
  const logger = useLogger();
  logger.debug(`current step: ${step}`);

  return (
    <Container>
      {step === 1 && <ClaimStep1 onContinue={moveToNextStep} />}
      {step === 2 && <ClaimStep2 onContinue={moveToNextStep} />}
      {step === 3 && <ClaimStep3 onContinue={moveToNextStep} />}
      {step === 4 && <ClaimStep4 onContinue={moveToNextStep} />}
      {step === 5 && <ClaimStep5 onContinue={moveToNextStep} />}
      {step === 6 && <ClaimStep6 onContinue={moveToNextStep} />}
      {step === 7 && <ClaimStep7 onContinue={moveToNextStep} />}
      {step === 8 && <ClaimStep8 onContinue={moveToNextStep} />}
      {step === 9 && <ClaimStep9 onContinue={moveToNextStep} />}
      {step === 10 && <Claim />}
    </Container>
  );
};

const Container = styled(Column)`
  height: 100vh;
  width: 100vw;
  background: ${(props) => props.theme.palette.claim.bg};
  justify-content: center;
  align-items: center;
`;
