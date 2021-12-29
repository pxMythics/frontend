import { Interface } from '@ethersproject/abi';
import { useContractCall, useEthers } from '@usedapp/core';
import { Config } from 'config';
import genesis from 'contract/genesis.json';
import { useRef, useState } from 'react';

export const useTokenBalance = () => {
  const { account } = useEthers();
  const [fetching, setFetching] = useState<boolean>(false);
  const fetchError = useRef<Error | null>(null);
  const contractABI = new Interface(genesis);
  const tokenBalance =
    useContractCall(
      account &&
        Config.contractAddress && {
          abi: contractABI, // ABI interface of the called contract
          address: Config.contractAddress, // On-chain address of the deployed contract
          method: 'balanceOf', // Method to be called
          args: [account], // Method arguments - address to be checked for balance
        },
    ) ?? [];
  return tokenBalance;
};
