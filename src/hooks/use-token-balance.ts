import { useCall, useEthers } from '@usedapp/core';
import { useContract } from 'hooks/use-contract';
import { isNil } from 'ramda';

export const useTokenBalance = (): number | undefined => {
  const { account } = useEthers();
  const contract = useContract();
  const result = useCall(
    !isNil(account) &&
      !isNil(contract) && {
        contract,
        method: 'balanceOf', // Method to be called
        args: [account], // Method arguments - address to be checked for balance
      },
  );
  if (isNil(result)) {
    return 0;
  }
  return Number(result.value?.[0]);
};
