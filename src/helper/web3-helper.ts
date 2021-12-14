import { Config } from 'config';
import Moralis from 'moralis';
import { isNil } from 'ramda';
import contract from 'contract/abi.json';

export const runContractFunction = (
  collectionName: string,
  functionName: string,
  params: Record<string, any> = {},
) => {

  const options = {
    contractAddress: Config.contractAddress,
    functionName,
    abi: contract,
    params,
  };

  const user = Moralis.User.current();
  if (isNil(user) || !user.authenticated()) {
    Moralis.Web3.authenticate()
      .then(() => Moralis.Web3.executeFunction(options))
      .catch(() => Promise.reject(Error(`user is not authenticated`)));
  }

  if (isNil(Moralis.Web3.activeWeb3Provider)) {
    return Moralis.Web3.enableWeb3()
      .then(() => Moralis.Web3.executeFunction(options))
      .catch(() => Promise.reject(Error(`web3 is not enabled`)));
  }

  return Moralis.Web3.executeFunction(options);
};
