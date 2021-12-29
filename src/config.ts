import { Config as DAppConfig, Hardhat, Localhost, Mainnet, Rinkeby } from '@usedapp/core';
import { mergeRight } from 'ramda';

enum EnvironmentType {
  DEBUG = 'debug',
  PROD = 'prod',
}

interface FrontendConfig {
  isDebug: boolean;
  isProduction: boolean;
  contractAddress: string;
  DAppConfig: DAppConfig;
}

const computeDAppConfig = (isDebug: boolean, alchemyUrl: string): DAppConfig =>
  isDebug
    ? getIsLocalNode()
      ? { networks: [Localhost, Hardhat] }
      : {
          readOnlyChainId: Rinkeby.chainId,
          readOnlyUrls: { [Rinkeby.chainId]: alchemyUrl },
          networks: [Rinkeby],
        }
    : {
        readOnlyChainId: Mainnet.chainId,
        readOnlyUrls: { [Mainnet.chainId]: alchemyUrl },
        networks: [Mainnet],
      };

const computeConfig = (): FrontendConfig => {
  const buildType = getEnvironmentType();

  console.info('Build type [%s].', buildType);

  // Fetch config from injected config when in prod (see index.html)
  const { alchemyUrl, contractAddress } = window.CONFIG || {
    alchemyUrl: getAlchemyUrl(),
    contractAddress: getContractAddress(),
  };
  return {
    isDebug: buildType === EnvironmentType.DEBUG,
    isProduction: buildType === EnvironmentType.PROD,
    contractAddress: contractAddress,
    DAppConfig: computeDAppConfig(buildType === EnvironmentType.DEBUG, alchemyUrl),
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
const getAlchemyUrl = (): string => process.env.REACT_APP_ALCHEMY_URL!;
const getIsLocalNode = (): boolean => process.env.REACT_APP_LOCAL_NODE! === 'true';

export const Config: Readonly<FrontendConfig> = computeConfig();
