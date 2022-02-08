import { Config } from 'config';

export const useSupportedChains = (): number[] =>
  Config.supportedNetworks.map((value) => value.chainId) ?? [];
