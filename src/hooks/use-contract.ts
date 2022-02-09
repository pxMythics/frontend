import { Contract } from '@ethersproject/contracts';
import { Config } from 'config';
import { useContractAbi, useOrbsContractAbi } from 'hooks/use-contract-abi';
import { useContractAddress } from 'hooks/use-contract-address';
import { useMemo, useRef } from 'react';

export const useContract = () => {
  const contractABI = useContractAbi();
  const contractAddress = useContractAddress();
  const contract = useRef<Contract>(new Contract(contractAddress, contractABI));
  return contract.current;
};

export const useOrbContract = (): Contract => {
  const abi = useOrbsContractAbi();
  const contract = useMemo(() => new Contract(Config.orbContractAddress, abi), []);
  return contract;
};
