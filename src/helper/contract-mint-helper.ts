import { mintPrice } from 'constant';
import { MintType } from 'model/api/mint-response';
import { utils } from 'ethers';

export const contractCallArgsForType = (
  mintType: MintType,
  nonce?: number,
  proof?: string[],
  mintCount?: number,
) => {
  switch (mintType) {
    case MintType.FREE:
      return { count: mintCount };
    case MintType.WHITELIST:
      return { nonce: nonce, proof: proof, value: utils.parseEther(mintPrice) };
    default:
      return {};
  }
};
