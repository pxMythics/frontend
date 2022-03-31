import { BigNumber } from 'ethers';
import { isNil } from 'ramda';

export const BASE_RATE = '1000000000000000000';
const DAY_IN_SECONDS = '86400';
export const GENESIS_START = '1641627068';

export enum GenesisType {
  GOD = 1,
  DEMI_GOD,
  ELEMENTAL,
}

export enum CreaturesAscension {
  NONE,
  ASCENDED_NONE,
  ASCENDED_SINGLE,
  ASCENDED_DOUBLE,
  ASCENDED_FULL,
}

/**
 * Get the multiplier rate based on GenesisType
 * @param genesisType The genesis type
 */
export const getGenesisMultiplierRate = (genesisType: GenesisType): number => {
  switch (genesisType) {
    case GenesisType.GOD:
      return 16;
    case GenesisType.DEMI_GOD:
      return 8;
    case GenesisType.ELEMENTAL:
      return 6;
  }
};

/**
 * Get the multiplier rate based on CreaturesAscension
 * @param creaturesAscension The creatures ascension type
 */
export const getCreaturesMultiplierRate = (creaturesAscension: CreaturesAscension): number => {
  switch (creaturesAscension) {
    case CreaturesAscension.NONE:
      return 1;
    case CreaturesAscension.ASCENDED_NONE:
      return 2;
    case CreaturesAscension.ASCENDED_SINGLE:
      return 3;
    case CreaturesAscension.ASCENDED_DOUBLE:
      return 4;
    case CreaturesAscension.ASCENDED_FULL:
      return 5;
  }
};

/**
 * Get rewards for a multiplier and a time
 * @param multiplier
 * @param from
 * @param to
 */
export const getRewards = (multiplier: number, from: string | number, to: number): BigNumber =>
  BigNumber.from(BASE_RATE)
    .mul(BigNumber.from(multiplier))
    .mul(BigNumber.from(to).sub(BigNumber.from(from)))
    .div(BigNumber.from(DAY_IN_SECONDS));

/**
 *
 * @param tokenType
 * @param currentTimestamp
 * @param lastClaimedTimestamp
 */
export const getRewardForGenesis = (
  tokenType: GenesisType,
  currentTimestamp: number,
  lastClaimedTimestamp: number,
): BigNumber => {
  if (isNil(lastClaimedTimestamp) || lastClaimedTimestamp === 0 || isNaN(lastClaimedTimestamp)) {
    return getRewards(getGenesisMultiplierRate(tokenType), GENESIS_START, currentTimestamp);
  }
  return getRewards(getGenesisMultiplierRate(tokenType), lastClaimedTimestamp, currentTimestamp);
};
