import { useContractFunction } from '@usedapp/core';
import { MintProgressModal } from 'components/mint/mint-progress-modal';
import { useContract } from 'hooks/use-contract';
import isNil from 'ramda/src/isNil';
import React, { useEffect } from 'react';

interface Props {
  mintCount: number;
  onTransactionDone?: (error?: string) => void;
}

export const FreeMinter: React.FunctionComponent<Props> = ({ mintCount, onTransactionDone }) => {
  const contract = useContract();

  const { state, send, events } = useContractFunction(contract, 'freeMint');

  // Send transaction on mount
  useEffect(() => {
    send(mintCount);
  }, []);

  useEffect(() => {
    if (!isNil(state) && state?.status !== 'Mining' && state?.status !== 'None') {
      onTransactionDone?.(state?.errorMessage);
    }
  }, [state]);

  return <MintProgressModal isMinting={state?.status === 'Mining'} />;
};
