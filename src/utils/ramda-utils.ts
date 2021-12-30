import { isEmpty, isNil } from 'ramda';

/**
 * Checks if a value is null, undefined, or empty
 * @param value
 */
export const isNilOrEmpty = (value: string | Array<any> | object | undefined | null): boolean =>
  isNil(value) || isEmpty(value);
