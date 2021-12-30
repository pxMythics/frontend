import { useContractCall, useEthers } from '@usedapp/core';
import { Config } from 'config';
import { useContractAbi } from 'hooks/use-contract-abi';

export const useTokenBalance = (): number | undefined => {
  const { account } = useEthers();
  const contractABI = useContractAbi();
  const tokenBalance = useContractCall(
    account &&
      Config.contractAddress && {
        abi: contractABI, // ABI interface of the called contract
        address: Config.contractAddress, // On-chain address of the deployed contract
        method: 'balanceOf', // Method to be called
        args: [account], // Method arguments - address to be checked for balance
      },
  );
  return tokenBalance && Number(tokenBalance[0]);
};
