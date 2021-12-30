import { useContractFunction } from '@usedapp/core';
import { MintProgressModal } from 'components/mint/mint-progress-modal';
import { mintPrice } from 'constant';
import { ethers } from 'ethers';
import { useContract } from 'hooks/use-contract';
import React, { useEffect } from 'react';

interface Props {
  nonce: number;
  proof: string[];
  onTransactionDone?: (error?: string) => void;
}

export const WLMinter: React.FunctionComponent<Props> = ({ nonce, proof, onTransactionDone }) => {
  const contract = useContract();
  const { state, send } = useContractFunction(contract, 'mintWhitelist');

  // Send transaction on mount
  useEffect(() => {
    send(nonce, proof, { value: ethers.utils.parseEther(mintPrice) });
  }, []);

  return (
    <MintProgressModal
      isMinting={state?.status === 'Mining'}
      onTransactionDone={() => onTransactionDone?.(state?.errorMessage)}
    />
  );
};
