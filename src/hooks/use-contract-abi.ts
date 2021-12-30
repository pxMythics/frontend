import { Interface } from '@ethersproject/abi';
import genesis from 'contract/genesis.json';
import { useRef } from 'react';

export const useContractAbi = () => {
  const contractABI = useRef<Interface>(new Interface(genesis));
  return contractABI.current;
};
