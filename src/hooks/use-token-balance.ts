import { Interface } from '@ethersproject/abi';
import { useContractCall, useEthers } from '@usedapp/core';
import { Config } from 'config';
import genesis from 'contract/genesis.json';

export const useTokenBalance = (): number | undefined => {
  const { account } = useEthers();
  const contractABI = new Interface(genesis);
  const tokenBalance = useContractCall(
    account &&
      Config.contractAddress && {
        abi: contractABI, // ABI interface of the called contract
        address: Config.contractAddress, // On-chain address of the deployed contract
        method: 'balanceOf', // Method to be called
        args: [account], // Method arguments - address to be checked for balance
      },
  );
  return tokenBalance && (tokenBalance[0] as number);
};
