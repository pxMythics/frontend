import { ChainId } from 'config';

export const getChainName = (chainId: ChainId): string => {
  switch (chainId) {
    case ChainId.ETHEREUM:
      return 'Ethereum Mainnet';
    case ChainId.BINANCE:
      return 'Binance Mainnet';
    case ChainId.BINANCE_TEST:
      return 'Binance Test Network';
    case ChainId.GOERLI:
      return 'Goerli Test Network';
    case ChainId.KOVAN:
      return 'Kovan Test Network';
    case ChainId.MATIC:
      return 'Matic (Polygon)';
    case ChainId.MUMBAI:
      return 'Mumbai (Polygon) Test Network';
    case ChainId.RINKEBY:
      return 'Rinkeby Test Network';
    case ChainId.ROPSTEN:
      return 'Ropsten Test Network';
    case ChainId.LOCAL:
      return 'Local network';
  }
};
