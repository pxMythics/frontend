import { Config } from 'config';
import { head } from 'ramda';
import { Chain } from '@usedapp/core';

// We force the values since it's a config and it's always defined
export const useChainId = (): number => head<Chain>(Config.DAppConfig.networks!)!.chainId;
