import { Axios } from 'axios';
import { Config } from 'config';
import { useMemo } from 'react';

export const useBackendClient = (): Axios =>
  useMemo(
    () =>
      new Axios({
        baseURL: Config.apiUrl,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        transformRequest: (data) => JSON.stringify(data),
        transformResponse: (response) => JSON.parse(response),
      }),
    [],
  );
