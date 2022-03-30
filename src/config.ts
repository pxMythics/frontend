import {
  Config as DAppConfig,
  Goerli,
  Hardhat,
  Kovan,
  Mainnet,
  Rinkeby,
  Ropsten,
} from '@usedapp/core';

enum EnvironmentType {
  DEBUG = 'debug',
  PROD = 'prod',
}

enum ChainName {
  Goerli = 'goerli',
  Hardhat = 'hardhat',
  Kovan = 'kovan',
  Mainnet = 'mainnet',
  Rinkeby = 'rinkeby',
  Ropsten = 'ropsten',
}

interface FrontendConfig {
  isDebug: boolean;
  contractAddress: string;
  genesisRevealContractAddress: string;
  orbContractAddress: string;
  dvnStakerContractAddress: string;
  dvnContractAddress: string;
  apiUrl: string;
  DAppConfig: DAppConfig;
}

const computeDAppConfig = (chainName: ChainName, alchemyUrl: string): DAppConfig => {
  if (chainName === ChainName.Rinkeby) {
    return {
      readOnlyChainId: Rinkeby.chainId,
      readOnlyUrls: { [Rinkeby.chainId]: alchemyUrl },
      networks: [Mainnet, Rinkeby, Ropsten, Goerli, Kovan],
    };
  }
  if (chainName === ChainName.Mainnet) {
    return {
      readOnlyChainId: Mainnet.chainId,
      readOnlyUrls: { [Mainnet.chainId]: alchemyUrl },
      networks: [Mainnet, Rinkeby, Ropsten, Goerli, Kovan],
    };
  }
  return {
    networks: [Hardhat],
    multicallAddresses: { [Hardhat.chainId]: '0x5ba1e12693dc8f9c48aad8770482f4739beed696' },
  };
};

const computeConfig = (): FrontendConfig => {
  const buildType = getEnvironmentType();
  const chainName = getChainName();
  // Fetch config from injected config when in prod (see index.html)
  const { alchemyUrl, apiUrl, orbContractAddress } = window.CONFIG ?? {};
  return {
    isDebug: buildType === EnvironmentType.DEBUG,
    contractAddress: getContractAddress(chainName),
    genesisRevealContractAddress: getGenesisRevealContractAddress(chainName),
    apiUrl: apiUrl ?? 'https://pxmythics.io/api',
    orbContractAddress: orbContractAddress,
    DAppConfig: computeDAppConfig(chainName, alchemyUrl ?? getAlchemyUrl()),
    dvnStakerContractAddress: getDvnStakerContractAddress(chainName),
    dvnContractAddress: getDvnContractAddress(chainName),
  };
};

const getEnvironmentType = (): EnvironmentType => {
  if (getBuildEnvironment() === 'production') {
    return EnvironmentType.PROD;
  }
  return EnvironmentType.DEBUG;
};

/**
 * The `process.env.NODE_ENV` variable is a special variable "injected" by Webpack
 * at runtime. The word "injected" is in double quotes for a good reason. Indeed,
 * the variable is not really injected, it's really a search & replace at build time
 * that is performed by Webpack. Meaning on the final bundle, this code will look
 * like `return "production"` (assuming `process.env.NODE_ENV` equals `production`).
 */
const getBuildEnvironment = (): string => process.env.NODE_ENV;
const getChainName = (): ChainName =>
  (process.env.REACT_APP_CHAIN as ChainName) ?? ChainName.Hardhat;
const getAlchemyUrl = (): string => process.env.REACT_APP_ALCHEMY_URL!;
const getContractAddress = (chainName: ChainName): string => {
  if (chainName === ChainName.Rinkeby) {
    return '';
  }
  return '0x12c63bbD266dB84e117356e664f3604055166CEc';
};
const getOrbContractAddress = (chainName: ChainName): string => {
  if (chainName === ChainName.Rinkeby) {
    return '';
  }
  return '';
};
const getGenesisRevealContractAddress = (chainName: ChainName): string => {
  if (chainName === ChainName.Rinkeby) {
    return '';
  }
  if (chainName === ChainName.Hardhat) {
    return '0xb63b300449B65EC58eCC6B94fAc9056411BAfC66';
  }
  return '0xb63b300449B65EC58eCC6B94fAc9056411BAfC66';
};
const getDvnContractAddress = (chainName: ChainName): string => {
  if (chainName === ChainName.Rinkeby) {
    return '';
  }
  if (chainName === ChainName.Hardhat) {
    return '0xb19b36b1456E65E3A6D514D3F715f204BD59f431';
  }
  return '0xb19b36b1456E65E3A6D514D3F715f204BD59f431';
};
const getDvnStakerContractAddress = (chainName: ChainName): string => {
  if (chainName === ChainName.Rinkeby) {
    return '';
  }
  if (chainName === ChainName.Hardhat) {
    return '0xe1Aa25618fA0c7A1CFDab5d6B456af611873b629';
  }
  return '0xe1Aa25618fA0c7A1CFDab5d6B456af611873b629';
};

export const Config: Readonly<FrontendConfig> = computeConfig();
