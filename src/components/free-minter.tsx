import { useContractFunction } from '@usedapp/core';
import { Box } from 'components/base/box';
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
    console.log(`state is ${state?.status}`);
    if (!isNil(state) && state?.status !== 'Mining' && state?.status !== 'None') {
      onTransactionDone?.(state?.errorMessage);
    }
  }, [state]);

  return <Box>{'minting'}</Box>;
};
