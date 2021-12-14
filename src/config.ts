enum EnvironmentType {
  DEBUG = 'debug',
  PROD = 'prod',
}

export enum ChainId {
  ETHEREUM = '0x1',
  ROPSTEN = '0x3',
  RINKEBY = '0x4',
  GOERLI = '0x5',
  KOVAN = '0x2a',
  BINANCE = '0x38',
  BINANCE_TEST = '0x61',
  MATIC = '0x89',
  MUMBAI = '0x13881',
  LOCAL = '0x539',
}

interface FrontendConfig {
  isDebug: boolean;
  isProduction: boolean;
  moralisURL: string;
  moralisAppId: string;
  contractAddress: string;
  ownerAddress: string;
  chainId: ChainId;
}

const computeConfig = (): FrontendConfig => {
  const buildType = getEnvironmentType();

  console.info('Build type [%s].', buildType);

  return {
    isDebug: buildType === EnvironmentType.DEBUG,
    isProduction: buildType === EnvironmentType.PROD,
    moralisURL: getMoralisURL(),
    moralisAppId: getMoralisAppId(),
    contractAddress: getContractAddress(),
    ownerAddress: getOwnerAddress(),
    chainId: getChainId(),
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
const getChainId = (): ChainId => (process.env.REACT_APP_CHAIN_ID as ChainId) ?? ChainId.ETHEREUM;
const getMoralisURL = (): string => process.env.REACT_APP_MORALIS_SERVER_URL!;
const getMoralisAppId = (): string => process.env.REACT_APP_MORALIS_APP_ID!;
const getContractAddress = (): string => process.env.REACT_APP_CONTRACT_ADDRESS!;
const getOwnerAddress = (): string => process.env.REACT_APP_OWNER_ADDRESS!;

export const Config: Readonly<FrontendConfig> = computeConfig();
