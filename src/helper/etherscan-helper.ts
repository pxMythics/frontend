import { ChainId, Config } from 'config';

export const getLinkForTx = (txHash: string): string => {
  switch (Config.chainId) {
    case ChainId.ETHEREUM:
      return `https://etherscan.io/tx/${txHash}`;
    case ChainId.GOERLI:
      return `https://goerli.etherscan.io/tx/${txHash}`;
    case ChainId.ROPSTEN:
      return `https://ropsten.etherscan.io/tx/${txHash}`;
    case ChainId.RINKEBY:
      return `https://rinkeby.etherscan.io/tx/${txHash}`;
    case ChainId.KOVAN:
      return `https://kovan.etherscan.io/tx/${txHash}`;
    default:
      // TODO Should probably not return an empty string, works for now
      return '';
  }
};
