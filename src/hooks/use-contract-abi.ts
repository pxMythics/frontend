import { Interface } from '@ethersproject/abi';
import genesis from 'contract/genesis.json';
import orbs from 'contract/orbs.json';
import { useMemo, useRef } from 'react';

export const useContractAbi = () => {
  const contractABI = useRef<Interface>(new Interface(genesis));
  return contractABI.current;
};

export const useOrbsContractAbi = (): Interface => {
  const abi = useMemo(() => new Interface(orbs), []);
  return abi;
};
