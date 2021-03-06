import { useEthers } from '@usedapp/core';
import { MintResponse, MintType } from 'model/api/mint-response';
import { useHttpClient } from 'provider/http-client-provider';
import { useLogger } from 'provider/logger-provider';
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
        if (res.data && res.data?.mint) {
          logger.info(`got mint access: ${JSON.stringify(res.data)}`);
          mintAccess.current = res.data;
        } else {
          logger.error(`error parsing mint access: ${JSON.stringify(res.data)}`);
          fetchError.current = new Error(JSON.stringify(res.data));
        }
        setFetching(false);
      })
      .catch((error) => {
        logger.error(`error fetching mint access: ${error.message}`);
        fetchError.current = error;
        setFetching(false);
      });
  }, [httpClient, account, logger]);

  useEffect(() => {
    if (!isNilOrEmpty(account) && !fetching) {
      mintAccess.current = null;
      fetchError.current = null;
      setFetching(true);
      fetchMintAccess();
    }
  }, [account]);

  return {
    fetching,
    mintType: mintAccess.current?.mint || MintType.NONE,
    mintCount: mintAccess.current?.mint_count,
    nonce: mintAccess.current?.nonce,
    // FIXME Backend should return proper value
    proof: mintAccess.current?.proof?.map((value) => `0x${value}`),
    error: fetchError.current,
  };
};
