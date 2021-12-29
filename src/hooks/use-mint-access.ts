import { useEthers } from '@usedapp/core';
import { MintResponse, MintType } from 'model/api/mint-response';
import { useHttpClient } from 'provider/http-client-provider';
import { useLogger } from 'provider/logger-provider';
import { isNil } from 'ramda';
import { useCallback, useEffect, useRef, useState } from 'react';
import { isNilOrEmpty } from 'utils/ramda-utils';

export interface MintAccess {
  fetching: boolean;
  mintType: MintType;
  nonce?: number;
  proof?: string[];
  mintCount?: number;
  error: Error | null;
}
/**
 * Returns the mint access for the current wallet address
 */
export const useMintAccess = (): MintAccess => {
  const mintAccess = useRef<MintResponse | null>();
  const { account } = useEthers();
  const httpClient = useHttpClient();
  const logger = useLogger();
  const [fetching, setFetching] = useState<boolean>(false);
  const fetchError = useRef<Error | null>(null);

  const fetchMintAccess = useCallback((): void => {
    httpClient
      .post<MintResponse>('mint', { address: account })
      .then((res) => {
        if (!isNil(res.data)) {
          mintAccess.current = res.data;
        }
        setFetching(false);
      })
      .catch((error) => {
        logger.error(`error fetching assets: ${error.message}`);
        fetchError.current = error;
        setFetching(false);
      });
  }, [httpClient, account]);

  useEffect(() => {
    if (!isNilOrEmpty(account) && !fetching) {
      console.log(`will check mint status for ${account}`);
      mintAccess.current = undefined;
      setFetching(true);
      fetchMintAccess();
    }
  }, [account]);

  return {
    fetching,
    mintType: mintAccess.current?.mint || MintType.NONE,
    nonce: mintAccess.current?.nonce,
    proof: mintAccess.current?.proof,
    error: fetchError.current,
  };
};
