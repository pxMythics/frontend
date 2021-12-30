import { useContractFunction } from '@usedapp/core';
import { Box } from 'components/base/box';
import { mintPrice } from 'constant';
import { ethers } from 'ethers';
import { useContract } from 'hooks/use-contract';
import isNil from 'ramda/src/isNil';
import React, { useEffect } from 'react';

interface Props {
  nonce: number;
  proof: string[];
  onTransactionDone?: (error?: string) => void;
}

export const WLMinter: React.FunctionComponent<Props> = ({ nonce, proof, onTransactionDone }) => {
  const contract = useContract();
  const { state, send, events } = useContractFunction(contract, 'mintWhitelist');

  // Send transaction on mount
  useEffect(() => {
    send(nonce, proof, { value: ethers.utils.parseEther(mintPrice) });
  }, []);

  useEffect(() => {
    console.log(`transaction state is ${state?.status} with error ${state?.errorMessage}`);
    if (!isNil(state) && state?.status !== 'Mining' && state?.status !== 'None') {
      onTransactionDone?.(state?.errorMessage);
    }
  }, [state]);

  return <Box>{'minting'}</Box>;
};
