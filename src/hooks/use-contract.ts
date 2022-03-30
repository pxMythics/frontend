import { Contract } from '@ethersproject/contracts';
import { Config } from 'config';
import { Interface } from '@ethersproject/abi';
import genesis from 'contract/genesis.json';
import genesisReveal from 'contract/genesis-reveal.json';
import orbs from 'contract/orbs.json';
import dvnStaker from 'contract/dvn-staker.json';
import dvn from 'contract/dvn.json';

export const useContract = (): Contract =>
  new Contract(Config.contractAddress, new Interface(genesis));

export const useOrbContract = (): Contract =>
  new Contract(Config.orbContractAddress, new Interface(orbs));

export const useDvnStakerContract = (): Contract =>
  new Contract(Config.dvnStakerContractAddress, new Interface(dvnStaker));

export const useGenesisRevealContract = (): Contract =>
  new Contract(Config.genesisRevealContractAddress, new Interface(genesisReveal));

export const useDvnContract = (): Contract =>
  new Contract(Config.dvnContractAddress, new Interface(dvn));
