import { Mainnet, Goerli, Kovan, Rinkeby, Ropsten, Localhost, Hardhat } from '@usedapp/core';

export const getChainName = (chainId: number | undefined): string => {
  if (chainId === Mainnet.chainId) {
    return Mainnet.chainName;
  }
  if (chainId === Goerli.chainId) {
    return Goerli.chainName;
  }
  if (chainId === Kovan.chainId) {
    return Kovan.chainName;
  }
  if (chainId === Rinkeby.chainId) {
    return Rinkeby.chainName;
  }
  if (chainId === Ropsten.chainId) {
    return Ropsten.chainName;
  }
  if (chainId === Localhost.chainId) {
    return Localhost.chainName;
  }
  if (chainId === Hardhat.chainId) {
    return Hardhat.chainName;
  }
  return '';
};
