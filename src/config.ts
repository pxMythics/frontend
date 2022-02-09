import {
  Chain,
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

interface FrontendConfig {
  isDebug: boolean;
  contractAddress: string;
  orbContractAddress: string;
  apiUrl: string;
  DAppConfig: DAppConfig;
  supportedNetworks: Chain[];
}

const computeDAppConfig = (isStaging: boolean, alchemyUrl: string): DAppConfig => {
  return isStaging
    ? getIsLocalNode()
      ? {
          networks: [Hardhat],
          // TODO This should be done automatically
          multicallAddresses: { [Hardhat.chainId]: '0x5fbdb2315678afecb367f032d93f642f64180aa3' },
        }
      : {
          readOnlyChainId: Rinkeby.chainId,
          readOnlyUrls: { [Rinkeby.chainId]: alchemyUrl },
          networks: [Mainnet, Rinkeby, Ropsten, Goerli, Kovan],
        }
    : {
        readOnlyChainId: Mainnet.chainId,
        readOnlyUrls: { [Mainnet.chainId]: alchemyUrl },
        networks: [Mainnet, Rinkeby, Ropsten, Goerli, Kovan],
      };
};
const computeConfig = (): FrontendConfig => {
  const buildType = getEnvironmentType();

  console.info('Build type [%s].', buildType);

  // Fetch config from injected config when in prod (see index.html)
  const { alchemyUrl, contractAddress, isStaging, apiUrl, orbContractAddress } = window.CONFIG || {
    alchemyUrl: getAlchemyUrl(),
    contractAddress: getContractAddress(),
    apiUrl: getBackendUrl(),
    orbContractAddress: getOrbContractAddress(),
    // More or less a hack, we want to be on rinkeby on staging but we don't pass the environment type
    // we inject it directly in the config
    isStaging: buildType === EnvironmentType.DEBUG,
  };

  return {
    isDebug: buildType === EnvironmentType.DEBUG,
    contractAddress: contractAddress || '0x976f87a62e8e2a9408E55D009d1022b5Ba8516f7',
    apiUrl,
    orbContractAddress,
    DAppConfig: computeDAppConfig(isStaging, alchemyUrl),
    supportedNetworks: isStaging ? [Rinkeby] : [Mainnet],
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
const getContractAddress = (): string => process.env.REACT_APP_CONTRACT_ADDRESS!;
const getOrbContractAddress = (): string => process.env.REACT_APP_ORB_CONTRACT_ADDRESS!;
const getBackendUrl = (): string => process.env.REACT_APP_BACKEND_URL!;
const getAlchemyUrl = (): string => process.env.REACT_APP_ALCHEMY_URL!;
const getIsLocalNode = (): boolean => process.env.REACT_APP_LOCAL_NODE! === 'true';

export const Config: Readonly<FrontendConfig> = computeConfig();
