import { Config } from 'config';

// We force the values since it's a config and it's always defined
export const useChainId = (): number[] =>
  Config.DAppConfig.networks?.map((value) => value.chainId) ?? [];
