import { useContractFunction } from '@usedapp/core';
import { MintProgressModal } from 'components/mint/mint-progress-modal';
import { useContract } from 'hooks/use-contract';
import React, { useEffect } from 'react';

interface Props {
  mintCount: number;
  onTransactionDone?: (error?: string) => void;
}

export const FreeMinter: React.FunctionComponent<Props> = ({ mintCount, onTransactionDone }) => {
  const contract = useContract();

  const { state, send } = useContractFunction(contract, 'freeMint');

  // Send transaction on mount
  useEffect(() => {
    send(mintCount);
  }, []);

  return (
    <MintProgressModal
      isMinting={state?.status === 'Mining' || state?.status === 'None'}
      onTransactionDone={() => onTransactionDone?.(state?.errorMessage)}
    />
  );
};
