/* eslint-disable camelcase */
export enum MintType {
  WHITELIST = 'allowed',
  FREE = 'free',
  NONE = 'none',
}

export interface MintResponse {
  mint: MintType;
  nonce?: number;
  proof?: string[];
  mint_count?: number;
}
