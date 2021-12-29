import { MintType } from 'model/api/mint-response';

export const contractFunctionForMintType = (mintType: MintType) => {
  switch (mintType) {
    case MintType.FREE:
    case MintType.WHITELIST:
    default:
      return undefined;
  }
};
