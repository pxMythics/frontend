import { useContractFunction } from '@usedapp/core';
import { useContract } from 'hooks/use-contract';
import { MintType } from 'model/api/mint-response';

export const useMintContractCall = (mintType: MintType) => {
  const contract = useContract();
  let functionName = '';
  switch (mintType) {
    case MintType.FREE:
      functionName = 'mintWhitelist';
      break;
    case MintType.WHITELIST:
      functionName = 'freeMint';
  }
  console.log(`using function ${functionName}`);
  return useContractFunction(contract, functionName);
};
