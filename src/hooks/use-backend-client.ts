import { Axios } from 'axios';
import { useMemo } from 'react';

export const useBackendClient = (): Axios =>
  useMemo(
    () =>
      new Axios({
        baseURL: 'https://pxmythics.io/api/',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        transformRequest: (data) => JSON.stringify(data),
        transformResponse: (response) => JSON.parse(response),
      }),
    [],
  );
