import { Contract } from '@ethersproject/contracts';
import { useContractAbi } from 'hooks/use-contract-abi';
import { useContractAddress } from 'hooks/use-contract-address';
import { useRef } from 'react';

export const useContract = () => {
  const contractABI = useContractAbi();
  const contractAddress = useContractAddress();
  const contract = useRef<Contract>(new Contract(contractAddress, contractABI));
  return contract.current;
};
